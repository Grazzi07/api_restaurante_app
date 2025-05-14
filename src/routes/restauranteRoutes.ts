import { Router } from 'express';
import { restauranteController } from '../controllers/restauranteController';

const router = Router();

router.post('/', restauranteController.criar);
router.get('/', restauranteController.listar);
router.get('/:id', restauranteController.obterPorId); 
router.put('/:id', restauranteController.atualizar); 
router.delete('/:id', restauranteController.deletar); 

export default router;