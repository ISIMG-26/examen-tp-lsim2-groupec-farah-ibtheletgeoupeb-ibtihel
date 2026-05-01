<?php
header('Content-Type: application/json');
require_once '../cnx.php';

$data = json_decode(file_get_contents('php://input'), true);

if(!$data || !isset($data['email']) || !isset($data['motdepasse']) || !isset($data['nom'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
$stmt->execute([$data['email']]);
if($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
    exit;
}

$mdp_hash = password_hash($data['motdepasse'], PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)");
    $stmt->execute([$data['nom'], $data['email'], $mdp_hash]);
    echo json_encode(['success' => true, 'message' => 'Inscription réussie']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
?>