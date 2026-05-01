document.addEventListener("DOMContentLoaded", function () {
  chargerVoitures();
  menuMobile();
  smoothScroll();
});

async function chargerVoitures() {
  try {
    const response = await fetch("api/voiture.php");
    const voitures = await response.json();

    afficherVoitures(voitures);
  } catch (error) {
    console.error("Erreur:", error);
    document.querySelectorAll(".cars-grid").forEach((grid) => {
      grid.innerHTML = '<div class="error">Erreur de chargement</div>';
    });
  }
}

function afficherVoitures(voitures) {
  const venteContainer = document.getElementById("venteCars");
  const locationContainer = document.getElementById("locationCars");

  venteContainer.innerHTML = "";
  locationContainer.innerHTML = "";

  voitures.forEach((voiture) => {
    const carCard = creerCarCard(voiture);
    if (voiture.type === "vente") {
      venteContainer.appendChild(carCard);
    } else {
      locationContainer.appendChild(carCard);
    }
  });
}

function creerCarCard(voiture) {
  const card = document.createElement("div");
  card.className = "car-card";
  card.innerHTML = `
        <img src="${voiture.image}" alt="${voiture.titre}" class="car-image">
        <div class="car-info">
            <h3 class="car-title">${voiture.titre}</h3>
            <div class="car-price">${voiture.prix}</div>
            <div class="car-details">
                <span><i class="fas fa-road"></i> ${voiture.km}</span>
                <span><i class="fas fa-calendar"></i> ${voiture.annee}</span>
                <span><i class="fas fa-gas-pump"></i> ${
                  voiture.carburant
                }</span>
            </div>
            <button class="btn-primary" onclick="reserver(${voiture.id}, '${
    voiture.type
  }')">
            ${voiture.type === "vente" ? "🚗 Acheter" : "🔑 Louer"}
        </button>
        </div>
    `;
  return card;
}

async function rechercherVoitures() {
  const recherche = document.getElementById("searchInput").value;
  const type = document.getElementById("typeFilter").value;

  try {
    const response = await fetch(
      `api/voiture.php?recherche=${recherche}&type=${type}`
    );
    const voitures = await response.json();
    afficherVoitures(voitures);
  } catch (error) {
    console.error("Erreur recherche:", error);
  }
}

async function reserver(voitureId, typeVoiture) {
  const sessionCheck = await fetch("api/check_session.php");
  const session = await sessionCheck.json();

  if (!session.connecte) {
    window.location.href = "login.php";
    return;
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal-box">
            <h2>${
              typeVoiture === "vente" ? "🚗 Acheter" : "🔑 Louer"
            } cette voiture</h2>
            <div id="modalMessage" class="message hidden"></div>

            <h3 style="margin:1.2rem 0 0.5rem;color:#e74c3c">👤 Informations personnelles</h3>
            <div class="input-group" style="margin-bottom:1rem">
                <input type="text" id="prenom" placeholder="Prénom" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
            </div>
            <div class="input-group" style="margin-bottom:1rem">
                <input type="text" id="telephone" placeholder="Téléphone" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
            </div>
            <div class="input-group" style="margin-bottom:1rem">
                <input type="text" id="adresse" placeholder="Adresse complète" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
            </div>
            <div class="input-group" style="margin-bottom:1rem">
                <input type="text" id="cin" placeholder="Numéro CIN" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
            </div>

            <h3 style="margin:1.2rem 0 0.5rem;color:#e74c3c">📅 Date souhaitée</h3>
            <div class="input-group" style="margin-bottom:1rem">
                <input type="date" id="dateReservation" min="${
                  new Date().toISOString().split("T")[0]
                }" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
            </div>

            <h3 style="margin:1.2rem 0 0.5rem;color:#e74c3c">💳 Mode de paiement</h3>
            <div style="display:flex;gap:1rem;margin-bottom:1rem">
                <label style="flex:1;cursor:pointer">
                    <input type="radio" name="modePaiement" value="comptant" checked onchange="togglePaiement()">
                    💵 Comptant
                </label>
                <label style="flex:1;cursor:pointer">
                    <input type="radio" name="modePaiement" value="facilite" onchange="togglePaiement()">
                    📆 Facilité
                </label>
            </div>

            <!-- Paiement comptant -->
            <div id="paiementComptant">
                <div style="margin-bottom:1rem">
                    <label style="display:block;margin-bottom:0.5rem;font-weight:500">Méthode</label>
                    <select id="methodePaiement" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
                        <option value="carte">💳 Carte bancaire</option>
                        <option value="virement">🏦 Virement bancaire</option>
                        <option value="especes">💵 Espèces</option>
                    </select>
                </div>
            </div>

            <!-- Paiement facilité -->
            <div id="paiementFacilite" style="display:none">
                <div style="margin-bottom:1rem">
                    <label style="display:block;margin-bottom:0.5rem;font-weight:500">Nombre de mensualités</label>
                    <select id="nbMensualites" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
                        <option value="3">3 mois</option>
                        <option value="6">6 mois</option>
                        <option value="12">12 mois</option>
                        <option value="24">24 mois</option>
                        <option value="36">36 mois</option>
                    </select>
                </div>
                <div style="margin-bottom:1rem">
                    <label style="display:block;margin-bottom:0.5rem;font-weight:500">Apport initial (%)</label>
                    <select id="apport" style="width:100%;padding:12px;border:2px solid #eee;border-radius:8px">
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="50">50%</option>
                    </select>
                </div>
                <div id="resumeFacilite" style="background:#f8f9fa;padding:1rem;border-radius:8px;margin-bottom:1rem;display:none">
                    <p id="texteResume" style="color:#333;font-weight:500"></p>
                </div>
            </div>

            <div style="display:flex;gap:1rem;margin-top:1.5rem">
                <button class="btn-primary" onclick="confirmerReservation(${voitureId})">✅ Confirmer</button>
                <button class="btn-primary" style="background:#999" onclick="fermerModal()">❌ Annuler</button>
            </div>
        </div>
    `;
  document.body.appendChild(modal);

  modal.querySelector(".modal-box").style.cssText +=
    "max-height:85vh;overflow-y:auto;";
}

function togglePaiement() {
  const mode = document.querySelector(
    'input[name="modePaiement"]:checked'
  ).value;
  document.getElementById("paiementComptant").style.display =
    mode === "comptant" ? "block" : "none";
  document.getElementById("paiementFacilite").style.display =
    mode === "facilite" ? "block" : "none";
}

function fermerModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) modal.remove();
}

async function confirmerReservation(voitureId) {
  const prenom = document.getElementById("prenom").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const adresse = document.getElementById("adresse").value.trim();
  const cin = document.getElementById("cin").value.trim();
  const date = document.getElementById("dateReservation").value;
  const mode = document.querySelector(
    'input[name="modePaiement"]:checked'
  ).value;

  if (!prenom || !telephone || !adresse || !cin || !date) {
    document.getElementById("modalMessage").textContent =
      "⚠️ Veuillez remplir tous les champs";
    document.getElementById("modalMessage").className = "message error";
    document.getElementById("modalMessage").classList.remove("hidden");
    return;
  }

  const paiementData = { mode };
  if (mode === "comptant") {
    paiementData.methode = document.getElementById("methodePaiement").value;
  } else {
    paiementData.mensualites = document.getElementById("nbMensualites").value;
    paiementData.apport = document.getElementById("apport").value;
  }

  try {
    const response = await fetch("api/reserver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voiture_id: voitureId,
        date: date,
        prenom,
        telephone,
        adresse,
        cin,
        paiement: paiementData,
      }),
    });
    const result = await response.json();

    if (result.success) {
      fermerModal();
      alert("✅ " + result.message);
      chargerVoitures();
    } else {
      document.getElementById("modalMessage").textContent = result.message;
      document.getElementById("modalMessage").className = "message error";
      document.getElementById("modalMessage").classList.remove("hidden");
    }
  } catch (error) {
    alert("Erreur lors de la réservation");
  }
}

function fermerModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) modal.remove();
}

async function confirmerReservation(voitureId) {
  const date = document.getElementById("dateReservation").value;
  if (!date) {
    document.getElementById("modalMessage").textContent =
      "Veuillez choisir une date";
    document.getElementById("modalMessage").className = "message error";
    document.getElementById("modalMessage").classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch("api/reserver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voiture_id: voitureId, date: date }),
    });
    const result = await response.json();

    if (result.success) {
      fermerModal();
      alert("✅ " + result.message);
      chargerVoitures();
    } else {
      document.getElementById("modalMessage").textContent = result.message;
      document.getElementById("modalMessage").className = "message error";
      document.getElementById("modalMessage").classList.remove("hidden");
    }
  } catch (error) {
    alert("Erreur lors de la réservation");
  }
}

function validerFormulaire(formId) {
  let isValid = true;

  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  document
    .querySelectorAll(".input-group input")
    .forEach((input) => (input.style.borderColor = "#eee"));

  if (formId === "formInscription") {
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const mdp = document.getElementById("motdepasse").value;
    const confmdp = document.getElementById("confmdp").value;

    if (nom.length < 2) {
      afficherErreur("nom", "Nom trop court (min 2 caractères)");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      afficherErreur("email", "Email invalide");
      isValid = false;
    }

    if (mdp.length < 8) {
      afficherErreur(
        "motdepasse",
        "Mot de passe trop court (min 8 caractères)"
      );
      isValid = false;
    }

    if (mdp !== confmdp) {
      afficherErreur("confmdp", "Les mots de passe ne correspondent pas");
      isValid = false;
    }
  } else if (formId === "formConnexion") {
    const email = document.getElementById("loginEmail").value.trim();
    if (!email) {
      afficherErreur("loginEmail", "Email requis");
      isValid = false;
    }
  }

  return isValid;
}

function afficherErreur(champId, message) {
  document.getElementById(champId + "Error").textContent = message;
  document.getElementById(champId).style.borderColor = "#e74c3c";
}

document
  .getElementById("formInscription")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validerFormulaire("formInscription")) {
      inscription();
    }
  });

document
  .getElementById("formConnexion")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validerFormulaire("formConnexion")) {
      connexion();
    }
  });

async function inscription() {
  const formData = {
    nom: document.getElementById("nom").value,
    email: document.getElementById("email").value,
    motdepasse: document.getElementById("motdepasse").value,
  };

  try {
    const response = await fetch("api/inscription.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    afficherMessage(result.message, result.success ? "success" : "error");
    if (result.success) {
      setTimeout(() => (window.location.href = "index.php"), 1500);
    }
  } catch (error) {
    afficherMessage("Erreur serveur", "error");
  }
}

async function connexion() {
  const formData = {
    email: document.getElementById("loginEmail").value,
    motdepasse: document.getElementById("loginMdp").value,
  };

  try {
    const response = await fetch("api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    afficherMessage(result.message, result.success ? "success" : "error");
    if (result.success) {
      setTimeout(() => (window.location.href = "index.php"), 1000);
    }
  } catch (error) {
    afficherMessage("Erreur de connexion", "error");
  }
}

function afficherMessage(message, type) {
  const msgDiv = document.getElementById("message");
  msgDiv.textContent = message;
  msgDiv.className = `message ${type}`;
  msgDiv.classList.remove("hidden");
}

function showInscription() {
  document.getElementById("inscriptionForm").classList.remove("hidden");
  document.getElementById("connexionForm").classList.add("hidden");
}

function showLogin() {
  document.getElementById("connexionForm").classList.remove("hidden");
  document.getElementById("inscriptionForm").classList.add("hidden");
}

function menuMobile() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu?.classList.toggle("active");
  });
}

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

document
  .getElementById("searchInput")
  ?.addEventListener("input", rechercherVoitures);
document
  .getElementById("typeFilter")
  ?.addEventListener("change", rechercherVoitures);
