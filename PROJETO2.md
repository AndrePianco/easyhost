# Projeto 2 — Frontend React + Backend Node.js
Autor: Andre Pianco

## Links
- App publicado (Vercel): _a preencher após deploy_
- Repositório: https://github.com/AndrePianco/easyhost
- API publicada (Render): _a preencher após deploy_
- Protótipo Figma (E7): _a preencher_
- Vídeo de apresentação: _a preencher_

## O que foi feito

### Frontend (React + Vite)
- 6 páginas: Login/Cadastro, Homepage, Servidores, Detalhe do Servidor, Adicionar Host, Perfil
- Componentes reutilizáveis: Navbar, ServerBanner
- Rotas com React Router DOM
- Camada de serviço centralizada em `src/services/api.js`
- Consumo da API com `fetch` + `useEffect` + estados de loading e erro
- Autenticação via `sessionStorage` (user ID persistido entre páginas)

### Backend (Node.js + Express + SQLite)
- API RESTful com Express 5
- Banco de dados SQLite via `better-sqlite3`
- CORS habilitado para integração com o frontend
- Endpoints de usuários: cadastro, login, exclusão de conta
- Endpoints de hosts: CRUD completo + toggle de status ativo/inativo
- Arquitetura em camadas: routes → controllers → services
- Middlewares de logger e tratamento de erros

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/usuarios` | Cadastrar usuário |
| POST | `/usuarios/login` | Login |
| DELETE | `/usuarios/:id` | Excluir conta |
| GET | `/hosts` | Listar hosts do usuário |
| GET | `/hosts/:id` | Detalhe de um host |
| POST | `/hosts` | Criar host |
| PATCH | `/hosts/:id` | Editar host |
| PATCH | `/hosts/:id/status` | Alternar status |
| DELETE | `/hosts/:id` | Excluir host |
