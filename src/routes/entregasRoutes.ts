import { Router } from 'express';
import { entregaController } from '../controllers/entregasController';
          


const router = Router();

router.post('/', (req, res) => entregaController.criar(req, res));
router.get('/', (req, res) => entregaController.listar(req, res));
router.get('/:id', async  (req, res) => entregaController.obterPorId(req, res));
router.put('/:id', (req, res) => entregaController.atualizar(req, res));
router.delete('/:id', (req, res) => entregaController.deletar(req, res));

export default router;
