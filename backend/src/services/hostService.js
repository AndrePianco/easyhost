import { db } from '../db.js';

export const hostService = {
  listarPorUsuario(userId) {
    return db
      .prepare('SELECT * FROM hosts WHERE user_id = ? ORDER BY created_at DESC')
      .all(userId);
  },

  buscarPorId(id, userId) {
    const host = db
      .prepare('SELECT * FROM hosts WHERE id = ? AND user_id = ?')
      .get(id, userId);

    if (!host) {
      const err = new Error('Servidor não encontrado.');
      err.status = 404;
      throw err;
    }
    return host;
  },

  criar({ user_id, name, link, status, notes, image }) {
    if (!name) {
      const err = new Error('O campo nome é obrigatório.');
      err.status = 400;
      throw err;
    }

    const result = db
      .prepare(
        'INSERT INTO hosts (user_id, name, link, status, notes, image) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(user_id, name, link || null, status || 'active', notes || null, image || null);

    return db.prepare('SELECT * FROM hosts WHERE id = ?').get(result.lastInsertRowid);
  },

  atualizar(id, userId, dados) {
    // Verifica se existe e pertence ao usuário
    hostService.buscarPorId(id, userId);

    const { name, link, status, notes, image } = dados;
    db.prepare(
      'UPDATE hosts SET name = COALESCE(?, name), link = COALESCE(?, link), status = COALESCE(?, status), notes = COALESCE(?, notes), image = COALESCE(?, image) WHERE id = ?'
    ).run(name, link, status, notes, image, id);

    return db.prepare('SELECT * FROM hosts WHERE id = ?').get(id);
  },

  alternarStatus(id, userId) {
    const host = hostService.buscarPorId(id, userId);
    const novoStatus = host.status === 'active' ? 'inactive' : 'active';
    db.prepare('UPDATE hosts SET status = ? WHERE id = ?').run(novoStatus, id);
    return db.prepare('SELECT * FROM hosts WHERE id = ?').get(id);
  },

  excluir(id, userId) {
    // Verifica se existe e pertence ao usuário
    hostService.buscarPorId(id, userId);
    db.prepare('DELETE FROM hosts WHERE id = ?').run(id);
  },
};
