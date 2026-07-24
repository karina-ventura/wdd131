const galeria = document.querySelector(".galeria");
const titulo = document.querySelector("main h2");
const home = document.querySelector("#home");
const old = document.querySelector("#old");
const novo = document.querySelector("#new");
const large = document.querySelector("#large");
const small = document.querySelector("#small");

function mostrarTemplos(listaTemplos) {

    galeria.innerHTML = "";

    listaTemplos.forEach((templo) => {

        const card = document.createElement("section");
        const titulo = document.createElement("h3");
        const local = document.createElement("p");
        const data = document.createElement("p");
        const area = document.createElement("p");
        const imagem = document.createElement("img");

        titulo.textContent = templo.nomeDoTemplo;

        local.innerHTML = `<strong>LOCALIZAÇÃO:</strong> ${templo.localizacao}`;
        data.innerHTML = `<strong>DEDICADO:</strong> ${templo.consagracao}`;
        area.innerHTML = `<strong>TAMANHO:</strong> ${templo.area.toLocaleString()} sq ft`;

        imagem.src = templo.urlDaImagem;
        imagem.alt = templo.nomeDoTemplo;
        imagem.loading = "lazy";

        card.appendChild(titulo);
        card.appendChild(local);
        card.appendChild(data);
        card.appendChild(area);
        card.appendChild(imagem);

        galeria.appendChild(card);
    });

}

mostrarTemplos(templos);

home.addEventListener("click", () => {
    titulo.textContent = "Página Inicial";
    mostrarTemplos(templos);
});

old.addEventListener("click", () => {

    const antigos = templos.filter((templo) => {

        return parseInt(templo.consagracao) < 1900;

    });

    mostrarTemplos(antigos);

});

novo.addEventListener("click", () => {

    const novos = templos.filter((templo) => {

        return parseInt(templo.consagracao) > 2000;

    });

    mostrarTemplos(novos);

});

large.addEventListener("click", () => {

    const grandes = templos.filter((templo) => {

        return templo.area > 90000;

    });

    mostrarTemplos(grandes);

});

small.addEventListener("click", () => {

    const pequenos = templos.filter((templo) => {

        return templo.area < 10000;

    });

    mostrarTemplos(pequenos);

});



