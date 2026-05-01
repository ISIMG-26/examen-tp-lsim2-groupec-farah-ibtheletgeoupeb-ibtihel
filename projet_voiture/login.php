<?php include 'cnx.php'; 
if(isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - AutoDeal</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo"><h2><i class="fas fa-car"></i> AutoDeal</h2></div>
                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link">Accueil</a></li>
                    <li><a href="login.php" class="nav-link active">Connexion</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main class="auth-container">
        <section class="auth-form">
            <h1><i class="fas fa-user-lock"></i> Connexion</h1>
            
            <div id="message" class="message hidden"></div>
            
            <div id="inscriptionForm" class="form-container hidden">
                <h2>Inscription</h2>
                <form id="formInscription">
                    <div class="input-group">
                        <input type="text" id="nom" placeholder="Nom complet" required>
                        <span class="error" id="nomError"></span>
                    </div>
                    <div class="input-group">
                        <input type="email" id="email" placeholder="Email" required>
                        <span class="error" id="emailError"></span>
                    </div>
                    <div class="input-group">
                        <input type="password" id="motdepasse" placeholder="Mot de passe (8+ chars)" required>
                        <span class="error" id="mdpError"></span>
                    </div>
                    <div class="input-group">
                        <input type="password" id="confmdp" placeholder="Confirmer mot de passe" required>
                        <span class="error" id="confmdpError"></span>
                    </div>
                    <button type="submit" class="btn-primary">S'inscrire</button>
                </form>
                <p>Déjà un compte ? <a href="#" onclick="showLogin()">Se connecter</a></p>
            </div>

            
            <div id="connexionForm" class="form-container">
                <h2>Connexion</h2>
                <form id="formConnexion">
                    <div class="input-group">
                        <input type="email" id="loginEmail" placeholder="Email" required>
                        <span class="error" id="loginEmailError"></span>
                    </div>
                    <div class="input-group">
                        <input type="password" id="loginMdp" placeholder="Mot de passe" required>
                        <span class="error" id="loginMdpError"></span>
                    </div>
                    <button type="submit" class="btn-primary">Se connecter</button>
                </form>
                <p>Pas de compte ? <a href="#" onclick="showInscription()">S'inscrire</a></p>
            </div>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>