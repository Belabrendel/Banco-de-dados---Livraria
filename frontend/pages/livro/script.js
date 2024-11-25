async function fetchLivros() {
    try {
        const response = await fetch("http://127.0.0.1:5000/livros");
        const livros = await response.json();
        console.log(livros); // Exibe os livros no console
        return livros; // Retorna os dados para uso posterior
    } catch (error) {
        console.log("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function fetchLivrosComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:5000/livros");
        const params = new URLSearchParams();
        const genero = document.getElementById("filtro-genero").value

        if (genero) params.append("genero",gênero);
        url.search = params.toString()

        const response = await fetch(url);
        const livros = await response.json();
    }catch(error){
        console.log(error)
    }

}


async function loadGeneroFilter() {
    const livros = await fetchLivros(); // Chama a função fetchLivros e obtém os livros
    const generosUnicos = [...new Set(livros.map(livro => livro.gênero))]; // Corrigido para 'gênero', com acento
    const generoSelect = document.getElementById("filtro-genero");

    // Preenche o filtro de gêneros
    generosUnicos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero;
        option.textContent = genero;
        generoSelect.appendChild(option);
    });
} 



async function loadLivros() {
    const livros = await fetchLivros();
    const tableDiv = document.getElementById("livros"); // Obtém o elemento pelo ID
    if (!tableDiv) {
        console.error("Elemento com ID 'livros' não encontrado.");
        return;
    }

    tableDiv.innerHTML = ""; // Limpa o conteúdo do elemento antes de adicionar novos dados

    livros.forEach(livro => {
        const row = document.createElement("div"); // Alterado para "div" se for um container
        row.innerHTML = `
            <h2>${livro.nome}</h2>
            <p><strong>Gênero:</strong> ${livro.gênero}</p> <!-- Aqui também é 'gênero' -->
            <p><strong>Ano de publicação:</strong> ${livro.ano}</p>
            <p><strong>LISBN:</strong> ${livro.lisbn}</p>
            <p><strong>edicao:</strong> ${livro.edicao}</p>
            <p><strong>Id do Autor:</strong> ${livro.idautor}</p>
            <p><strong>pais de origem:</strong> ${livro.pais_origem}</p>
            <p><strong>numero_pagina:</strong> ${livro.numero_pagina}</p>
        `;
        tableDiv.appendChild(row); // Adiciona a nova linha ao container
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadGeneroFilter(); // Chama a função para carregar o filtro de gênero
    loadLivros(); // Carrega todos os livros inicialmente
});
