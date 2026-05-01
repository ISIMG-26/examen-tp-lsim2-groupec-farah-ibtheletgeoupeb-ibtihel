<?php
header('Content-Type: application/json');
require_once '../cnx.php';

$data = json_decode(file_get_contents('php://input'), true);

if(!$data || !isset($data['email']) || !isset($data['motdepasse'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

if($user && password_verify($data['motdepasse'], $user['mot_de_passe'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nom'] = $user['nom'];
    $_SESSION['role'] = $user['role'];
    echo json_encode(['success' => true, 'message' => 'Connexion réussie']);
} else {
    echo json_encode(['success' => false, 'message' => 'Email ou mot de passe incorrect']);
}
?>