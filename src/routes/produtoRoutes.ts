import { Router } from 'express';
import { produtoController } from '../controllers/produtoController';

const router = Router();

router.post('/', (req, res) => produtoController.criar(req, res)); 
router.get('/', (req, res) => produtoController.listar(req, res));
router.get('/:id', (req, res) => produtoController.obterPorId(req, res)); 
router.put('/:id', (req, res) => produtoController.atualizar(req, res)); 
router.delete('/:id', (req, res) => produtoController.deletar(req, res)); 

export default router;