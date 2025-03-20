// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Mock Data (Replace with a proper data source like a JSON file or API)
    const diseases = [
        {
            id: 1,
            name: "Scurvy",
            category: "vitamins",
            description: "Vitamin C deficiency leading to bleeding gums and poor wound healing.",
            symptoms: ["Bleeding gums", "Fatigue", "Poor wound healing", "Joint pain"],
            prevention: "Consume foods rich in Vitamin C like citrus fruits, berries, and leafy green vegetables."
        },
        {
            id: 2,
            name: "Rickets",
            category: "vitamins",
            description: "Vitamin D deficiency affecting bone development in children.",
            symptoms: ["Bone pain", "Muscle weakness", "Delayed growth", "Skeletal deformities"],
            prevention: "Ensure adequate sunlight exposure and consume Vitamin D-rich foods or supplements."
        },
        {
            id: 3,
            name: "Iron Deficiency Anemia",
            category: "minerals",
            description: "Iron deficiency resulting in reduced red blood cell production.",
            symptoms: ["Fatigue", "Weakness", "Pale skin", "Shortness of breath"],
            prevention: "Consume iron-rich foods like red meat, beans, and leafy green vegetables; consider iron supplements if needed."
        },
        {
            id: 4,
            name: "Goiter",
            category: "minerals",
            description: "Iodine deficiency causing enlargement of the thyroid gland.",
            symptoms: ["Swelling in the neck", "Difficulty breathing", "Coughing", "Hoarseness"],
            prevention: "Use iodized salt and consume iodine-rich foods like seafood and dairy products."
        },
        {
            id: 5,
            name: "Pellagra",
            category: "vitamins",
            description: "Niacin (Vitamin B3) deficiency causing skin problems, diarrhea, and dementia.",
            symptoms: ["Dermatitis", "Diarrhea", "Dementia", "Mouth sores"],
            prevention: "Consume niacin-rich foods like meat, poultry, fish, and grains; supplement if needed."
        },
        {
            id: 6,
            name: "Osteoporosis",
            category: "minerals",
            description: "Calcium deficiency leading to brittle bones and increased risk of fractures.",
            symptoms: ["Bone pain", "Fractures", "Loss of height", "Stooped posture"],
            prevention: "Consume calcium-rich foods like dairy products, leafy green vegetables, and fortified foods; supplement if needed."
        }

    ];

    const diseasesContainer = document.getElementById('diseases-container');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalSymptoms = document.getElementById('modal-symptoms');
    const modalPrevention = document.getElementById('modal-prevention');
    const closeBtn = document.querySelector('.close');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('nav a');
    let currentCategory = 'all';  // Initial category

    // Function to create disease card elements
    function createDiseaseCard(disease) {
        const card = document.createElement('div');
        card.classList.add('disease-card');
        card.innerHTML = `
            <h2 class="disease-title">${disease.name}</h2>
            <p class="disease-description">${disease.description}</p>
        `;

        card.addEventListener('click', () => openModal(disease));
        card.title = disease.description; // Add tooltip

        return card;
    }

    // Function to populate the diseases container based on category
    function populateDiseases(category = 'all') {
        diseasesContainer.innerHTML = '';  // Clear existing cards
        let filteredDiseases = diseases;

        if (category !== 'all') {
            filteredDiseases = diseases.filter(disease => disease.category === category);
        }

        filteredDiseases.forEach(disease => {
            const card = createDiseaseCard(disease);
            diseasesContainer.appendChild(card);
        });
    }

    // Initial population of diseases
    populateDiseases();

    // Modal Functions
    function openModal(disease) {
        modalTitle.textContent = disease.name;
        modalDescription.textContent = disease.description;
        modalSymptoms.innerHTML = '';
        disease.symptoms.forEach(symptom => {
            const li = document.createElement('li');
            li.textContent = symptom;
            modalSymptoms.appendChild(li);
        });
        modalPrevention.textContent = disease.prevention;
        modal.style.display = "block";
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });


    // Dark Mode Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Category Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            currentCategory = category;
            populateDiseases(category);

            // Optionally add active class to the selected nav link
            navLinks.forEach(l => l.classList.remove('active')); // Remove active class from others
            this.classList.add('active'); // Add to the current link
        });
    });


});