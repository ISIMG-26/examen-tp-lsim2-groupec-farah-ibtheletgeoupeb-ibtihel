<?php include 'cnx.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoDeal - Voitures à vendre et louer</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">
                    <h2><i class="fas fa-car"></i> AutoDeal</h2>
                </div>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.php" class="nav-link active">Accueil</a></li>
                    <li><a href="#vente" class="nav-link">Vente</a></li>
                    <li><a href="#location" class="nav-link">Location</a></li>
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <li><a href="admin.php" class="nav-link">Admin</a></li>
                        <li><a href="api/logout.php" class="nav-link">Déconnexion</a></li>
                    <?php else: ?>
                        <li><a href="login.php" class="nav-link">Connexion</a></li>
                    <?php endif; ?>
                </ul>
                <div class="hamburger" id="hamburger">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>Trouvez votre voiture idéale</h1>
            <p>Vente et location de véhicules neufs et d'occasion</p>
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Rechercher une voiture...">
                <select id="typeFilter">
                    <option value="">Tous les types</option>
                    <option value="vente">À vendre</option>
                    <option value="location">À louer</option>
                </select>
                <button onclick="rechercherVoitures()"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </section>

    <main>
        <section id="vente" class="cars-section">
            <div class="container">
                <h2>Voitures à vendre</h2>
                <div class="cars-grid" id="venteCars">
                    <div class="loading">Chargement des voitures...</div>
                </div>
            </div>
        </section>

        <section id="location" class="cars-section">
            <div class="container">
                <h2>Voitures à louer</h2>
                <div class="cars-grid" id="locationCars">
                    <div class="loading">Chargement des voitures...</div>
                </div>
            </div>
        </section>
    </main>


    <footer>
        <div class="container">
            <p>&copy; 2026 AutoDeal.  AutoDeal@gmail.com</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>