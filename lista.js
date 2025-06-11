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