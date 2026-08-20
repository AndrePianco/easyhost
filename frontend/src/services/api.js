// URL da API — usa variável de ambiente do Vite; cai para localhost em dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Retorna o id do usuário logado salvo no sessionStorage
function getUserId() {
  return sessionStorage.getItem('userId');
}

// Headers padrão com autenticação
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-user-id': getUserId(),
  };
}

// ─── Usuários ────────────────────────────────────────────────────────────────

export async function cadastrarUsuario({ email, password }) {
  const resp = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || 'Erro ao cadastrar.');
  return corpo;
}

export async function fazerLogin({ email, password }) {
  const resp = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || 'E-mail ou senha inválidos.');
  return corpo;
}

export async function excluirConta(id) {
  const resp = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!resp.ok) {
    const corpo = await resp.json();
    throw new Error(corpo.erro || 'Erro ao excluir conta.');
  }
}

// ─── Hosts ───────────────────────────────────────────────────────────────────

export async function listarHosts() {
  const resp = await fetch(`${API_URL}/hosts`, {
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error('Falha ao carregar servidores.');
  return resp.json();
}

export async function buscarHost(id) {
  const resp = await fetch(`${API_URL}/hosts/${id}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error('Servidor não encontrado.');
  return resp.json();
}

export async function criarHost(dados) {
  const resp = await fetch(`${API_URL}/hosts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || 'Erro ao criar servidor.');
  return corpo;
}

export async function atualizarHost(id, dados) {
  const resp = await fetch(`${API_URL}/hosts/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || 'Erro ao atualizar servidor.');
  return corpo;
}

export async function alternarStatus(id) {
  const resp = await fetch(`${API_URL}/hosts/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  const corpo = await resp.json();
  if (!resp.ok) throw new Error(corpo.erro || 'Erro ao alterar status.');
  return corpo;
}

export async function excluirHost(id) {
  const resp = await fetch(`${API_URL}/hosts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!resp.ok) {
    const corpo = await resp.json();
    throw new Error(corpo.erro || 'Erro ao excluir servidor.');
  }
}
