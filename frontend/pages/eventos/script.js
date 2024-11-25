async function fetchEventos() {
    try {
        const response = await fetch("http://127.0.0.1:5000/evento");
        const eventos = await response.json();
        console.log(eventos); // Exibe os eventos no console
        return eventos; // Retorna os dados para uso posterior
    } catch (error) {
        console.log("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function fetchEventosComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:5000/evento");
        const params = new URLSearchParams();
        const evento = document.getElementById("filtro-evento").value; // Filtro de evento

        if (evento) params.append("evento", evento); // Adiciona o filtro se houver
        url.search = params.toString();

        const response = await fetch(url);
        const eventos = await response.json();
        console.log(eventos); // Exibe os eventos filtrados no console
        return eventos;
    } catch (error) {
        console.log("Erro ao buscar eventos com filtro:", error);
        return [];
    }
}

async function loadEventoFilter() {
    const eventos = await fetchEventos(); // Busca os eventos
    const categoriasUnicas = [...new Set(eventos.map(evento => evento.idevento))]; // Categorias únicas
    const eventoSelect = document.getElementById("filtro-evento");

    // Preenche o filtro de categorias de evento
    categoriasUnicas.forEach(idevento => {
        const option = document.createElement("option");
        option.value = idevento;
        option.textContent = idevento;
        eventoSelect.appendChild(option);
    });
}

async function loadEventos() {
    const eventos = await fetchEventos(); // Busca os eventos
    const tableDiv = document.getElementById("eventos"); // Obtém o elemento pelo ID
    if (!tableDiv) {
        console.error("Elemento com ID 'eventos' não encontrado.");
        return;
    }

    tableDiv.innerHTML = ""; // Limpa o conteúdo antes de adicionar novos dados

    eventos.forEach(evento => {
        const row = document.createElement("div");
        row.innerHTML = `
            <h2>${evento.categoria}</h2>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Data:</strong> ${new Date(evento.data_evento).toLocaleDateString()}</p>
            <p><strong>Nome do Palestrante:</strong> ${evento.palestrante}</p>
            <p><strong>id do evento:</strong> ${evento.idevento}</p>
        `;
        tableDiv.appendChild(row); // Adiciona a nova linha ao container
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadEventoFilter(); // Carrega o filtro de categorias
    loadEventos(); // Carrega todos os eventos inicialmente
});
