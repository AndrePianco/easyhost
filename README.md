# EasyHost 🎮

EasyHost é um painel de gerenciamento para servidores de jogos. Este projeto foi desenvolvido como entrega final para a disciplina de **Desenvolvimento Web** (UEPB 2026.1).

A aplicação permite que os usuários criem uma conta, façam login e gerenciem seus servidores de jogos (adicionando, editando, excluindo e ativando/desativando). Tudo isso com uma interface premium e moderna, consumindo uma API RESTful própria.

## 🚀 Tecnologias Utilizadas

### Frontend (`/frontend`)
- **React.js** com **Vite**
- **React Router DOM** (roteamento)
- **CSS Vanilla** (Variáveis, Flexbox, CSS Grid, Glassmorphism)
- **Context API** (para sistema de internacionalização PT/EN)
- Armazenamento de sessão com `sessionStorage` e preferências com `localStorage`

### Backend (`/backend`)
- **Node.js** com **Express 5**
- **SQLite** via `better-sqlite3` (persistência local)
- **CORS** habilitado para comunicação com o front
- Arquitetura em camadas (Rotas → Controllers → Services)

## ✨ Funcionalidades

- **Autenticação:** Cadastro e login com validação de força de senha.
- **Internacionalização (i18n):** Suporte nativo para Português (PT) e Inglês (EN) com troca em tempo real.
- **Dashboard:** Visualização dos servidores ativos e de todos os servidores cadastrados.
- **CRUD Completo:** Adicionar, visualizar detalhes, editar informações e excluir servidores.
- **Busca e Filtros:** Pesquisa em tempo real pelo nome do servidor e filtro por status (Ativo/Inativo).
- **Tema:** Interface com design moderno focado na usabilidade (dark mode nativo).

## 💻 Como Rodar o Projeto Localmente

O projeto é dividido em duas partes que precisam rodar simultaneamente: a API (Backend) e a Aplicação (Frontend).

### Passo 1: Iniciando o Backend (API)

Abra um terminal, navegue até a pasta do backend e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```
> O backend estará rodando em `http://localhost:3000`

### Passo 2: Iniciando o Frontend (Aplicação)

Abra um **novo** terminal, navegue até a pasta do frontend e inicie o Vite:

```bash
cd frontend
npm install
npm run dev
```
> O frontend estará rodando em `http://localhost:5173` (ou a porta que o Vite indicar). Acesse essa URL no seu navegador.

## 📁 Estrutura do Repositório

- `/frontend` - Todo o código do React (componentes, páginas, serviços, CSS).
- `/backend` - Código da API Node.js (banco de dados, rotas, lógica de negócio).
- `PROJETO2.md` - Arquivo de entrega da disciplina contendo links e detalhes de deploy.

## 👨‍💻 Desenvolvedor
- Andre Pianco
