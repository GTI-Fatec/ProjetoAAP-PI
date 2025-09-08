const headerHTML = `
    <figure class="header-logos">
        <img src="imagens/fatec.png" alt="Logo Fatec"> &ensp; &ensp; &ensp;
        <img src="imagens/Centro_Paula_Souza.png" alt="Logo Centro Paula Souza"> &ensp; &ensp; &ensp;
        <img src="imagens/Sao_Paulo.png" alt="Logo Governo de São Paulo">
    </figure>
`;

const navHTML = `
    <nav class="main-nav">
        <button class="hamburger-menu" id="hamburger-menu">
            &#9776;
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="fundamentos de marketing.html">Marketing</a></li>
            <li><a href="gestao de pessoas.html">Gestão de Pessoas</a></li>
            <li><a href="gestao financeira.html">Gestão Financeira</a></li>
            <li><a href="ingles iv.html">Inglês IV</a></li>
            <li><a href="programacao para internet.html">Programação para Internet</a></li>
            <li><a href="redes de computadores.html">Redes de Computadores</a></li>
            <li><a href="Equipe.html">Equipe Projeto</a></li>
        </ul>
    </nav>
`;

const footerHTML = `
    <footer class="main-footer">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="fundamentos de marketing.html">Marketing</a></li>
            <li><a href="gestao de pessoas.html">Gestão de Pessoas</a></li>
            <li><a href="gestao financeira.html">Gestão Financeira</a></li>
            <li><a href="ingles iv.html">Inglês IV</a></li>
            <li><a href="programacao para internet.html">Programação para Internet</a></li>
            <li><a href="redes de computadores.html">Redes de Computadores</a></li>
            <li><a href="Equipe.html">Equipe Projeto</a></li>
        </ul>
    </footer>
`;

function generateHeader() {
    document.getElementById('main-header').innerHTML = headerHTML;
}

function generateNav() {
    document.getElementById('main-nav-placeholder').innerHTML = navHTML;
}

function generateFooter() {
    document.getElementById('main-footer-placeholder').innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('main-header')) {
        generateHeader();
    }
    if (document.getElementById('main-nav-placeholder')) {
        generateNav();
    }
    if (document.getElementById('main-footer-placeholder')) {
        generateFooter();
    }

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('nav-links-active');
        });
    }
});
