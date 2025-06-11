// LEVANTANDO SERVIDOR através do EXPRESS e do CORS
// CORS - middleware para habilitar Cross-Origin Resource Sharing

const express = require('express');
const cors = require('cors');
const api = require('./api'); //importa o arquivo de rotas definido localmente

const app = express(); //criando uma instância do aplicativo Express, o servidor

app.use(cors()); //habilita o CORS para todas as rotas, permitindo que a API seja acessada de diferentes domínios/origens, sem isso as req frontend seriam bloqueadas
app.use(express.json()); // parsing (interpretação) do corpo das req no formato JSON, transforma o 'body' das req post/put em objetos javascript
app.use(api); //monta todas as rotas definidas no módulo 'api' importado, e as rotas serão acessíveis

// separando em constantes os dados do servidor e porta de acesso
const host = 'localhost';
const PORT = 3000;

//levanta a conexão com o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor funcionando em http://${host}:${PORT}`);
})