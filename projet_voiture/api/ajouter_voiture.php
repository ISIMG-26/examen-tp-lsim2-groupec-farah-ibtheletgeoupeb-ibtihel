<?php
include '../cnx.php';

if(!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../index.php');
    exit;
}

if($_POST) {
    $stmt = $pdo->prepare("INSERT INTO voitures (titre, prix, type, km, annee, carburant, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $image = "https://via.placeholder.com/400x250/e74c3c/ffffff?text=" . urlencode($_POST['titre']);
    $stmt->execute([
        $_POST['titre'], 
        $_POST['prix'], 
        $_POST['type'], 
        $_POST['km'] ?? '', 
        $_POST['annee'] ?? '', 
        $_POST['carburant'] ?? '',
        $image
    ]);
    
    header('Location: ../admin.php?success=1');
}
?>