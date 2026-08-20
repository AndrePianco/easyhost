# EasyHost API

Backend do EasyHost — API RESTful com Node.js, Express e SQLite.

## Tecnologias
- Node.js (ESM)
- Express 5
- better-sqlite3
- cors + dotenv

## Rodando localmente

```bash
cd backend
npm install
npm run dev     # http://localhost:3000
```

## Endpoints

### Usuários
| Método | Rota | Body | Descrição |
|--------|------|------|-----------|
| POST | `/usuarios` | `{ email, password }` | Cadastrar |
| POST | `/usuarios/login` | `{ email, password }` | Login |
| DELETE | `/usuarios/:id` | — | Excluir conta |

### Hosts
> Todas as rotas de hosts precisam do header `x-user-id: <id do usuário>`

| Método | Rota | Body | Descrição |
|--------|------|------|-----------|
| GET | `/hosts` | — | Listar hosts do usuário |
| GET | `/hosts/:id` | — | Detalhe de um host |
| POST | `/hosts` | `{ name, link?, status?, notes?, image? }` | Criar host |
| PATCH | `/hosts/:id` | campos opcionais | Editar host |
| PATCH | `/hosts/:id/status` | — | Alternar ativo/inativo |
| DELETE | `/hosts/:id` | — | Excluir host |

## Deploy no Render

1. Suba o repositório no GitHub (pasta `backend/` inclusa)
2. Em **render.com**, crie um novo **Web Service**
3. Conecte o repositório GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Copie a URL gerada (ex: `https://easyhost-api.onrender.com`)
6. No Vercel (frontend), adicione a variável de ambiente:
   - `VITE_API_URL = https://easyhost-api.onrender.com`

> **Nota**: O SQLite no Render usa disco efêmero — os dados resetam ao redeploy. Para a apresentação isso é suficiente.
