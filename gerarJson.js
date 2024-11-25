const { Client } = require('pg');
const fs = require('fs');

// Configuração de conexão com o PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'livraria_bd',
  password: 'isabela',
  port: 5432,
});

// Função para gerar o arquivo JSON
async function gerarJSON() {
  try {
    // Conectar ao banco de dados
    await client.connect();

    // Realizar a consulta no banco de dados
    const res = await client.query('SELECT * FROM LIVRO');

    // Converter o resultado para JSON
    const dadosJSON = JSON.stringify(res.rows, null, 2);

    // Salvar o arquivo JSON
    fs.writeFileSync('livros.json', dadosJSON);

    console.log('Arquivo JSON gerado com sucesso!');
  } catch (err) {
    console.error('Erro ao gerar JSON:', err);
  } finally {
    // Fechar a conexão com o banco de dados
    await client.end();
  }
}

// Executar a função
gerarJSON();
