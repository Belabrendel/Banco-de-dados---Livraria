async function fetchComprovante() {
    try {
        const response = await fetch("http://127.0.0.1:5000/comprovante");
        const compras = await response.json();
        console.log(compras); // Exibe os livros no console
        return compras; // Retorna os dados para uso posterior
    } catch (error) {
        console.log("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function fetchComprovanteComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:5000/livros");
        const params = new URLSearchParams();
        const comprovante = document.getElementById("filtro-comprovante").value

        if (comprovante) params.append("comprovante",comprovante);
        url.search = params.toString()

        const response = await fetch(url);
        const compras = await response.json();
    }catch(error){
        console.log(error)
    }

}


async function loadGeneroFilter() {
    const livros = await fetchComprovante(); // Chama a função fetchLivros e obtém os livros
    const generosUnicos = [...new Set(livros.map(comprovante => comprovante.cpf))]; // Corrigido para 'gênero', com acento
    const generoSelect = document.getElementById("filtro-comprovante");

    // Preenche o filtro de gêneros
    generosUnicos.forEach(comprovante => {
        const option = document.createElement("option");
        option.value = comprovante;
        option.textContent = comprovante;
        generoSelect.appendChild(option);
    });
} 



async function loadLivros() {
    const comprovante = await fetchComprovante();
    const tableDiv = document.getElementById("compras"); // Obtém o elemento pelo ID
    if (!tableDiv) {
        console.error("Elemento com ID 'compras' não encontrado.");
        return;
    }

    tableDiv.innerHTML = ""; // Limpa o conteúdo do elemento antes de adicionar novos dados

    comprovante.forEach(comprovante => {
        const row = document.createElement("div"); // Alterado para "div" se for um container
        row.innerHTML = `
            <h2>${comprovante.cpf}</h2>
            <p><strong>Forma de pagamento:</strong> ${comprovante.forma_pagamento}</p> <!-- Aqui também é 'gênero' -->
            <p><strong>Nome do Livro:</strong> ${comprovante.nome}</p>
            <p><strong>Nota Fiscal:</strong> ${comprovante.nota_fiscal}</p>
            <p><strong>quantidade:</strong> ${comprovante.quantidade}</p>
            <p><strong>Telefone:</strong> ${comprovante.telefone}</p>
        
        `;
        tableDiv.appendChild(row); // Adiciona a nova linha ao container
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadGeneroFilter(); // Chama a função para carregar o filtro de gênero
    loadLivros(); // Carrega todos os livros inicialmente
});
