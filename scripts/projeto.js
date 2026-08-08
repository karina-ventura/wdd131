const collections = [
    {
        name: "Família",
        description: "Momentos compartilhados com pessoas especiais.",
        category: "família"
    },
    {
        name: "Viagens",
        description: "Lugares, descobertas e experiências inesquecíveis.",
        category: "viagens"
    },
    {
        name: "Aniversários",
        description: "Celebrações e datas que merecem ser lembradas.",
        category: "aniversários"
    },
    {
        name: "Conquistas",
        description: "Momentos que marcaram novas etapas da vida.",
        category: "conquistas"
    }
];

const featuredMoments = [
    {
        title: "Momentos em família",
        description: "Pequenos momentos compartilhados que se tornam especiais.",
        image: "../imagens/familia.jpg"
    },
    {
        title: "Novos lugares",
        description: "Viagens e descobertas que merecem ser lembradas.",
        image: "../imagens/viagem.jpg"
    },
    {
        title: "Dias de celebração",
        description: "Comemorações que ficam marcadas na nossa história.",
        image: "../imagens/celebracao.jpg"
    }
];

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("header nav");

function toggleMenu() {
    navigation.classList.toggle("open");

    const menuIsOpen = navigation.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
    );
}

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

function displayCollections(collectionList, container) {

    if (!container) {
        return;
    }

    container.innerHTML = collectionList.map((collection) => `
        <article class="collection-card">

            <p class="eyebrow">${collection.category}</p>

            <h3>${collection.name}</h3>

            <p>${collection.description}</p>

        </article>
    `).join("");
}

const collectionContainer = document.querySelector("#collection-container");

displayCollections(collections, collectionContainer);

const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const collectionResults = document.querySelector("#collection-results");

function populateCategoryFilter() {

    if (!categoryFilter) {
        return;
    }

    const categories = collections.map(
        (collection) => collection.category
    );

    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.forEach((category) => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
        categoryFilter.appendChild(option);
    });
}


function filterCollections() {

    if (!collectionResults) {
        return;
    }

    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredCollections = collections.filter((collection) => {

        const matchesSearch =
            collection.name.toLowerCase().includes(searchTerm) ||
            collection.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            collection.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayCollections(filteredCollections, collectionResults);
}


if (categoryFilter) {
    populateCategoryFilter();
    categoryFilter.addEventListener("change", filterCollections);
}

if (searchInput) {
    searchInput.addEventListener("input", filterCollections);
}

if (collectionResults) {
    displayCollections(collections, collectionResults);
}

const featuredContainer = document.querySelector("#featured-container");

function displayFeaturedMoments() {

    if (!featuredContainer) {
        return;
    }

    featuredContainer.innerHTML = featuredMoments.map((moment) => `
        <article class="photo-card">

            <img
                src="${moment.image}"
                alt="${moment.title}"
                loading="lazy"
            >

            <div class="photo-card-content">
                <h3>${moment.title}</h3>
                <p>${moment.description}</p>
            </div>

        </article>
    `).join("");
}

displayFeaturedMoments();

const momentForm = document.querySelector("#moment-form");
const timeline = document.querySelector("#timeline");

let savedMoments =
    JSON.parse(localStorage.getItem("memoraMoments")) || [];


function saveMoments() {
    localStorage.setItem(
        "memoraMoments",
        JSON.stringify(savedMoments)
    );
}


function displayMoments() {

    if (!timeline) {
        return;
    }

    if (savedMoments.length === 0) {

        timeline.innerHTML = `
            <p>
                Ainda não há momentos registrados.
                Adicione seu primeiro momento acima.
            </p>
        `;

        return;
    }

    timeline.innerHTML = savedMoments.map((moment) => `
        <article class="timeline-card">

            ${moment.image ? `
                <img
                    src="${moment.image}"
                    alt="${moment.title}"
                    loading="lazy"
                >
            ` : ""}

            <div class="timeline-card-content">

                <p class="eyebrow">${moment.category}</p>

                <h3>${moment.title}</h3>

                <time datetime="${moment.date}">
                    ${moment.date}
                </time>

                <p>${moment.description}</p>

            </div>

        </article>
    `).join("");
}


function handleMomentSubmit(event) {

    event.preventDefault();

    const title =
        document.querySelector("#moment-title").value.trim();

    const category =
        document.querySelector("#moment-category").value;

    const date =
        document.querySelector("#moment-date").value;

    const image =
        document.querySelector("#moment-image").value.trim();

    const description =
        document.querySelector("#moment-description").value.trim();


    if (!title || !category || !date || !description) {
        return;
    }


    const newMoment = {
        title: title,
        category: category,
        date: date,
        image: image,
        description: description
    };


    savedMoments.push(newMoment);

    saveMoments();

    displayMoments();

    momentForm.reset();
}


if (momentForm) {
    momentForm.addEventListener("submit", handleMomentSubmit);
    displayMoments();
}