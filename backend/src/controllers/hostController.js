import { hostService } from '../services/hostService.js';

// Extrai o user_id do header x-user-id (estratégia simples sem JWT)
function getUserId(req) {
  const id = Number(req.headers['x-user-id']);
  if (!id) {
    const err = new Error('Usuário não autenticado. Faça login.');
    err.status = 401;
    throw err;
  }
  return id;
}

export const hostController = {
  listar(req, res, next) {
    try {
      const userId = getUserId(req);
      res.json(hostService.listarPorUsuario(userId));
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      const userId = getUserId(req);
      res.json(hostService.buscarPorId(Number(req.params.id), userId));
    } catch (err) {
      next(err);
    }
  },

  criar(req, res, next) {
    try {
      const userId = getUserId(req);
      const host = hostService.criar({ ...req.body, user_id: userId });
      res.status(201).json(host);
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      const userId = getUserId(req);
      const host = hostService.atualizar(Number(req.params.id), userId, req.body);
      res.json(host);
    } catch (err) {
      next(err);
    }
  },

  alternarStatus(req, res, next) {
    try {
      const userId = getUserId(req);
      const host = hostService.alternarStatus(Number(req.params.id), userId);
      res.json(host);
    } catch (err) {
      next(err);
    }
  },

  excluir(req, res, next) {
    try {
      const userId = getUserId(req);
      hostService.excluir(Number(req.params.id), userId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
