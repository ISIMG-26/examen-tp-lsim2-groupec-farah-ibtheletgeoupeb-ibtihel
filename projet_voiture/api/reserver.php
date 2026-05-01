<?php
if (session_status() === PHP_SESSION_NONE) session_start();
header('Content-Type: application/json');
require_once '../cnx.php';

if(!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Connexion requise']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$voiture_id = $data['voiture_id'];
$date = $data['date'] ?? date('Y-m-d');

try {
    $stmt = $pdo->prepare("SELECT * FROM voitures WHERE id = ?");
    $stmt->execute([$voiture_id]);
    $voiture = $stmt->fetch();
    
    if($voiture) {
        if($voiture['type'] === 'location') {
            $stmt = $pdo->prepare("UPDATE voitures SET statut = 'reservee' WHERE id = ?");
            $stmt->execute([$voiture_id]);
        }
        
        $stmt = $pdo->prepare("INSERT INTO reservations (user_id, voiture_id, date_reservation) VALUES (?, ?, ?)");
        $stmt->execute([$_SESSION['user_id'], $voiture_id, $date]);
        
        echo json_encode(['success' => true, 'message' => 'Réservation effectuée !']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Voiture introuvable']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
?>