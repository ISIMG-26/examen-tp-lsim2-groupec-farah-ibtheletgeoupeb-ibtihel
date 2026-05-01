<?php 
include 'cnx.php'; 
if(!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - AutoDeal</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo"><h2><i class="fas fa-car"></i> AutoDeal Admin</h2></div>
                <ul class="nav-menu">
                    <li><a href="index.php">Accueil</a></li>
                    <li><a href="admin.php" class="active">Admin</a></li>
                    <li><a href="api/logout.php">Déconnexion</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main class="admin-container">
        <div class="container">
            <h1>Gestion des Voitures</h1>
            
            <section class="admin-form">
                <h2>Ajouter une voiture</h2>
                <?php
                if(isset($_GET['success'])) echo '<div class="success">Voiture ajoutée avec succès !</div>';
                ?>
                <form method="POST" action="api/ajouter_voiture.php">
                    <input type="text" name="titre" placeholder="Titre" required>
                    <input type="text" name="prix" placeholder="Prix" required>
                    <select name="type" required>
                        <option value="vente">Vente</option>
                        <option value="location">Location</option>
                    </select>
                    <input type="text" name="km" placeholder="Kilométrage">
                    <input type="number" name="annee" placeholder="Année">
                    <input type="text" name="carburant" placeholder="Carburant">
                    <button type="submit">Ajouter</button>
                </form>
            </section>

            <section class="voitures-list">
                <h2>Liste des voitures</h2>
                <?php
                $stmt = $pdo->query("SELECT * FROM voitures ORDER BY created_at DESC");
                while($voiture = $stmt->fetch()):
                ?>
                <div class="voiture-admin">
                    <img src="<?= $voiture['image'] ?>" alt="<?= $voiture['titre'] ?>">
                    <div>
                        <h3><?= $voiture['titre'] ?></h3>
                        <p><?= $voiture['prix'] ?></p>
                        <a href="api/supprimer_voiture.php?id=<?= $voiture['id'] ?>" 
                           onclick="return confirm('Supprimer ?')" class="btn-danger">Supprimer</a>
                    </div>
                </div>
                <?php endwhile; ?>
            </section>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html>