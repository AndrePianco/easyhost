import { db } from '../db.js';

export const usuarioService = {
  cadastrar({ email, password }) {
    // Verifica se email já existe
    const existe = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
    if (existe) {
      const err = new Error('E-mail já cadastrado.');
      err.status = 409;
      throw err;
    }

    const result = db
      .prepare('INSERT INTO usuarios (email, password) VALUES (?, ?)')
      .run(email, password);

    return { id: result.lastInsertRowid, email };
  },

  login({ email, password }) {
    const usuario = db
      .prepare('SELECT * FROM usuarios WHERE email = ? AND password = ?')
      .get(email, password);

    if (!usuario) {
      const err = new Error('E-mail ou senha inválidos.');
      err.status = 401;
      throw err;
    }

    // Remove a senha da resposta
    const { password: _, ...semSenha } = usuario;
    return semSenha;
  },

  excluir(id) {
    const result = db.prepare('DELETE FROM usuarios WHERE id = ?').run(id);
    if (result.changes === 0) {
      const err = new Error('Usuário não encontrado.');
      err.status = 404;
      throw err;
    }
  },
};
