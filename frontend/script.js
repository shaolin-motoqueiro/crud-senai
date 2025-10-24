const API_URL = 'http://localhost:3000/usuarios';

const form = document.getElementById('form');
const tabela = document.querySelector('#tabela tbody');
const inputId = document.getElementById('id');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputIdade = document.getElementById('idade');

async function carregarUsuarios() {
  const res = await fetch(API_URL);
  const usuarios = await res.json();
  tabela.innerHTML = ''; // Limpa a tabela antes de popular

  usuarios.forEach(u => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = u.id;
    tr.appendChild(tdId);

    const tdNome = document.createElement('td');
    tdNome.textContent = u.nome;
    tr.appendChild(tdNome);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = u.email;
    tr.appendChild(tdEmail);

    const tdIdade = document.createElement('td');
    tdIdade.textContent = u.idade;
    tr.appendChild(tdIdade);

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editarUsuario(u.id, u.nome, u.email, u.idade));
    tdAcoes.appendChild(btnEditar);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => deletarUsuario(u.id));
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    idade: parseInt(inputIdade.value)
  };
  const id = inputId.value;

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  }

  form.reset();
  carregarUsuarios();
});

async function deletarUsuario(id) {
  if (confirm('Deseja realmente excluir este usuário?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarUsuarios();
  }
}

function editarUsuario(id, nome, email, idade) {
  inputId.value = id;
  inputNome.value = nome;
  inputEmail.value = email;
  inputIdade.value = idade;
}

carregarUsuarios();
