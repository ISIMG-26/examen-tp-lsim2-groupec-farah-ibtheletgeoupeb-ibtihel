<?php
session_start();
require_once '../cnx.php';
echo json_encode([
    'connecte' => isset($_SESSION['user_id']),
    'role' => $_SESSION['role'] ?? null
]);
?>