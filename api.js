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

// define uma rota DELETE para excluir os dados que já estão no servidor, com endpoint do nome do item a ser excluído

router.delete('/itens/:nome', (req, res) => { //rota que responde a req HTTP DELETE, com a URL que a rota vai capturar, o ":nome" é um parâmetro dinâmico que será extraído da URL
    const { nome } = req.params; //o objeto que contém os parâmetros da rota (o valor após /itens/), após a desestruturação para extrair o valor do parâmtro none
    const index = lista.findIndex(item => item.nome === nome); // index retorna o índice do primeiro elemento que satisfaz a condição
    if (index !== -1 ) { //findIndex retorna -1 quando não encontra, então pela lógica presume-se que encontrou algum resultado
        lista.splice(index, 1); //remove 1 item no índice encontrado
        res.status(200).json({ message: 'Item removido' });
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
})



//exportando a constante "router" através de módulos
module.exports = router;