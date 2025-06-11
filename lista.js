const input = document.getElementById('itemInput');
const btn = document.getElementById('addItemBtn');
const lista = document.getElementById('listaDeItens');

//função assíncrona para Carregar os itens do array da API
async function carregarLista() {
    const res = await fetch('http://localhost:3000/itens'); //fetch solicitando o array em JSON
    const itens = await res.json(); //converte objeto JSON da API para objeto em javascript
    lista.innerHTML = '';
    itens.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${item.nome}
            <button class="btn btn-danger btn-sm"> Deletar <i class="bi bi-x-circle-fill"></i></button>
        `; // conteúdo do LI criado

        // botão de deletar da lista
        const btnDeletar = li.querySelector('button'); //dentro da constante LI, houve uma função nativa que selecionou o botão dentro do innerHTML
        btnDeletar.addEventListener('click', async () => { //async retorna uma promise e podemos usar AWAIT dentro dela
            //confirmação para deletar ou não
            const confirmar = confirm(`Deseja excluir ${item.nome}?`) //abre uma janela para confirmar a exclusão, retorna booleano
            if (confirmar) { //se confirmar for TRUE, então vai excluir
                await fetch(`http://localhost:3000/itens/${item.nome}`, { //usado AWAIT pra esperar uma PROMISSE, declarado no ASYNC
                method: 'DELETE' //tipo de requisição http para excluir uma rota
            })
            };
            carregarLista();
        })

        lista.appendChild(li);
    });
}

// evento de clicar no botão, aciona uma ação assíncrona
btn.addEventListener('click', async () => {
    const nome = input.value.trim(); //constante recebe o valor que vem do input
    if (nome) { //se o valor de nome for verdadeiro, aciona a função FETCH, que adiciona o valor pelo método POST, a adição do valor no array é gerenciado na API
        await fetch('http://localhost:3000/itens', { //Fetch inicia uma requisição HTTP
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' }, //headers são informações adicionais que acompanham a requisição, o CONTENT-TYPE indica que os dados estarão em JSON para o servidor
            body: JSON.stringify({ nome }) //body: os dados que estão sendo enviados p/ o servidor // JSON.Stringfy({nome}) converte o nome para objeto JSON {"nome" : "*dados enviados pelo body"}
        });
        input.value = ''; //volta o input a não ter valor
        carregarLista(); //carrega a lista dos nomes adicionados, após adicionar um novo
    }
})

carregarLista();