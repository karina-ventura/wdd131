document.addEventListener("DOMContentLoaded", () => {

    let reviews = Number(localStorage.getItem("reviews")) || 0;

    reviews++;

    localStorage.setItem("reviews", reviews);

    const contador = document.querySelector("#contador");

    if (contador) {
        contador.textContent = reviews;
    }

    const ano = document.querySelector("#ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    const ultima = document.querySelector("#ultima");

    if (ultima) {
        ultima.textContent = `Última Modificação: ${document.lastModified}`;
    }

});