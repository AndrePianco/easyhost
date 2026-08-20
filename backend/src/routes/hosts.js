import { Router } from 'express';
import { hostController } from '../controllers/hostController.js';

const router = Router();

// GET  /hosts        — listar hosts do usuário
router.get('/', hostController.listar);

// GET  /hosts/:id    — detalhe de um host
router.get('/:id', hostController.buscarPorId);

// POST /hosts        — criar host
router.post('/', hostController.criar);

// PATCH /hosts/:id         — editar dados do host
router.patch('/:id', hostController.atualizar);

// PATCH /hosts/:id/status  — alternar ativo/inativo
router.patch('/:id/status', hostController.alternarStatus);

// DELETE /hosts/:id  — excluir host
router.delete('/:id', hostController.excluir);

export default router;
