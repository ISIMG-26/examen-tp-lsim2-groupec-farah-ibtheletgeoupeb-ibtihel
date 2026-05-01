<?php
header('Content-Type: application/json');
require_once '../cnx.php';
$recherche = $_GET['recherche'] ?? '';
$type = $_GET['type'] ?? '';

$sql = "SELECT * FROM voitures where 1=1";
$params = [];

if($recherche) {
    $sql .= " AND titre LIKE :recherche";
    $params[':recherche'] = "%$recherche%";
}
if($type) {
    $sql .= " AND type = :type";
    $params[':type'] = $type;
}

$sql .= " ORDER BY created_at DESC";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch(PDOException $e) {
    echo json_encode(['error' => 'Erreur requête']);
}
?>