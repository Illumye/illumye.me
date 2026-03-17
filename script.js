// Dictionnaire de tes logos SVG (pour qu'il associe le mot tapé dans le CMS au bon logo)
const logos = {
  github:
    '<svg class="app-logo" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>',
  x: '<svg class="app-logo" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.763l4.717 6.233L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path></svg>',
  statsfm:
    '<svg class="app-logo" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M77.77 151.96H31.86C14.37 151.96 0.2 166.17 0.2 183.69V477.17C0.2 494.69 14.37 508.9 31.86 508.9H77.77C95.26 508.9 109.43 494.69 109.43 477.17V183.69C109.43 166.17 95.26 151.96 77.77 151.96Z"></path><path d="M277.24 0.73h-45.91C213.84 0.73 199.67 14.93 199.67 32.46V477.17C199.67 494.69 213.84 508.9 231.33 508.9h45.91c17.49 0 31.66-14.21 31.66-31.73V32.46C308.9 14.93 294.73 0.73 277.24 0.73Z"></path><path d="M476.7 291.04h-45.91c-17.49 0-31.66 14.21-31.66 31.73V477.17c0 17.52 14.17 31.73 31.66 31.73H476.7c17.49 0 31.66-14.21 31.66-31.73V322.76c0-17.52-14.17-31.73-31.66-31.73Z"></path></svg>',
  swipefy:
    '<svg class="app-logo" viewBox="0 0 660 670" xmlns="http://www.w3.org/2000/svg"><path d="M323.59 55.58L60.33 102.17C27.01 108.07 4.77 139.94 10.65 173.35L86.15 602.35C92.03 635.77 123.81 658.07 157.13 652.18L420.39 605.58C453.71 599.69 475.95 567.82 470.07 534.41L394.57 105.4C388.69 71.99 356.91 49.68 323.59 55.58Z"></path><path d="M614.08 189.39L354.52 125.24C321.67 117.13 288.47 137.25 280.37 170.19L176.42 593.17C168.33 626.12 188.39 659.4 221.25 667.52L480.81 731.67C513.66 739.79 546.85 719.67 554.95 686.72L658.9 263.75C667 230.8 646.93 197.51 614.08 189.39Z"></path></svg>',
  default:
    '<svg class="app-logo" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>',
};

// Fonction pour récupérer le fichier JSON
fetch("/donnees.json")
  .then((response) => response.json())
  .then((data) => {
    // 1. Mise à jour du profil
    const avatar = document.getElementById("dyn-avatar");
    if (data.profil.avatar) {
      avatar.src = data.profil.avatar;
      avatar.style.display = "inline-block";
    }
    document.getElementById("dyn-nom").innerText = data.profil.nom || "";
    document.getElementById("dyn-sous-titre").innerText =
      data.profil.sous_titre || "";

    // 2. Génération des boutons
    const conteneurLiens = document.getElementById("dyn-liens");
    conteneurLiens.innerHTML = ""; // On vide le conteneur

    if (data.liens && data.liens.length > 0) {
      data.liens.forEach((lien) => {
        // On cherche le SVG correspondant à l'identifiant (ex: 'github'), sinon icône par défaut
        const svgIcon = logos[lien.icone.toLowerCase()] || logos["default"];

        // Création du HTML du bouton
        const boutonHTML = `
                            <a href="${lien.url}" class="link-btn" target="_blank">
                                ${svgIcon}
                                <span>${lien.titre}</span>
                                <svg class="arrow-icon" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path></svg>
                            </a>
                        `;
        conteneurLiens.innerHTML += boutonHTML;
      });
    }
  })
  .catch((error) => {
    console.error("Erreur de chargement des données :", error);
    document.getElementById("dyn-nom").innerText = "Erreur de chargement";
  });

const modal = document.getElementById("shareModal");

function openModal() {
  modal.classList.add("active");
}

function closeModal(event, force = false) {
  if (force || event.target === modal) {
    modal.classList.remove("active");
  }
}

function copyLink(event) {
  event.preventDefault();
  navigator.clipboard.writeText("https://illumye.me").then(
    function () {
      const iconContainer = document.getElementById("copyIconContainer");
      const textSpan = document.getElementById("copyText");

      const originalSvg =
        '<svg id="copySvg" viewBox="0 0 24 24"><path d="M19 8H9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z"></path><path d="M5 16H4V5a2 2 0 0 1 2-2h11v1h-11a1 1 0 0 0-1 1v11z"></path></svg>';
      const tickSvg =
        '<svg viewBox="0 0 24 24" fill="#25d366"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>';

      iconContainer.innerHTML = tickSvg;
      textSpan.innerText = "Copied!";
      textSpan.style.color = "#25d366";

      setTimeout(function () {
        iconContainer.innerHTML = originalSvg;
        textSpan.innerText = "Copy Link";
        textSpan.style.color = "#666666";
      }, 2000);
    },
    function (err) {
      console.error("Erreur lors de la copie : ", err);
    },
  );
}
