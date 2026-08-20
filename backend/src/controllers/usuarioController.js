import { usuarioService } from '../services/usuarioService.js';

export const usuarioController = {
  cadastrar(req, res, next) {
    try {
      const usuario = usuarioService.cadastrar(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      next(err);
    }
  },

  login(req, res, next) {
    try {
      const usuario = usuarioService.login(req.body);
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  },

  excluir(req, res, next) {
    try {
      usuarioService.excluir(Number(req.params.id));
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
