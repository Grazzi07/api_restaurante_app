import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';

const router = Router();

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.obterPorId); 
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.deletar);

export default router;