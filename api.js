// IMPORTANDO EXPRESS E ROUTER - framework express para levantar e dar rotas ao servidor através do Node JS
// API REST, com endpoints padrão

const express = require('express');
const router = express.Router(); //função dentro do express para criar rotas

const lista = []; //array vazio que conterá os dados inseridos pelo usuário

//router.get define um método http get(solicita dados)
// '/itens' é o endpoint da URL que acionará a função, quando acessar o http://dominio.com/itens executará a rota
// (req, res) função de callbak, sendo req request, informações da requisição ----- e res response para enviar uma resposta ao cliente


router.get('/itens', (req, res) => {
    res.status(200).json(lista); //status 200 indica req bem sucedida, o json(lista) envia uma resposta em formato json, converte o objeto/array para json
});


//define uma rota POST (enviar dados ao servidor), com o mesmo endpoint do GET, mas com o método diferente
router.post('/itens', (req, res) => {
    const { nome } = req.body; //extrai a propriedade NOME do corpo da requisição usando DESESTRUTURAÇÃO
    if (nome && typeof nome ==='string') { //validação se o nome existe ou se é do tipo String
        lista.push({nome}); //adiciona o novo objeto {nome} ao array LISTA
        res.status(201).json({ message: 'Item adicionado' }); //retorna o status 201 (boa prática para criação bem-sucedida), e envia mensagem de confirmação em JSON
    } else {
        res.status(400).json({ error: 'Nome inválido' }); //status 400 (erro do cliente), mensagem de erro em JSON
    }
})

//exportando a constante "router" através de módulos
module.exports = router;