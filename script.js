// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    // Fonction pour mettre à jour le texte et l'icône du bouton
    function updateButtonText(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Mode Clair';
        } else {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Mode Sombre';
        }
    }

    // Vérifier si un thème est sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateButtonText(savedTheme);
    }

    // Gestionnaire d'événement pour le bouton
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonText(newTheme);
    });
});




// Éléments du DOM
const generateBtn = document.getElementById('generateBtn');
const tripResults = document.getElementById('tripResults');
const destinationImage = document.getElementById('destinationImage');
const destinationName = document.getElementById('destinationName');
const accommodationImage = document.getElementById('accommodationImage');
const accommodationName = document.getElementById('accommodationName');
const accommodationPrice = document.getElementById('accommodationPrice');
const accommodationDescription = document.getElementById('accommodationDescription');
const activitiesList = document.getElementById('activitiesList');
const activitiesImage = document.getElementById('activitiesImage');

// Fonction pour générer un voyage aléatoire
function generateTrip() {
    // Ajout de la classe loading
    generateBtn.classList.add('loading');
    
    // Simuler un temps de chargement
    setTimeout(() => {
        // Sélection aléatoire d'une destination
        const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
        // Sélection aléatoire d'un logement
        const randomAccom = randomDest.logements[Math.floor(Math.random() * randomDest.logements.length)];

        // Mise à jour des images
        destinationImage.src = randomDest.image;
        destinationImage.alt = randomDest.lieu;
        accommodationImage.src = randomAccom.image;
        accommodationImage.alt = randomAccom.nom;
        activitiesImage.src = "image/activitesbali.jpg";

        // Mise à jour des textes
        destinationName.textContent = randomDest.lieu;
        accommodationName.textContent = randomAccom.nom;
        accommodationPrice.textContent = randomAccom.prix;
        accommodationDescription.textContent = randomAccom.description;

        // Mise à jour des activités
        activitiesList.innerHTML = randomDest.activites.map(activity => `
            <div class="activity-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                </svg>
                <p class="text-gray-700">${activity}</p>
            </div>
        `).join('');

        // Afficher les résultats
        tripResults.classList.remove('hidden');
        
        // Retirer la classe loading
        generateBtn.classList.remove('loading');
    }, 800);
}

// Écouteur d'événement sur le bouton
generateBtn.addEventListener('click', generateTrip);