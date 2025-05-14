// routes/itemPedidoRoutes.ts
import { Router, Request, Response } from 'express';
import { itemPedidoController } from '../controllers/itemPedidoController';

const router = Router();

router.post('/', (req, res) => itemPedidoController.criar(req, res)); 
router.get('/', (req, res) => itemPedidoController.listar(req, res)); 
router.get('/:id', async (req: Request, res: Response) => {await itemPedidoController.obterPorId(req, res);});
router.put('/:id', (req, res) => itemPedidoController.atualizar(req, res)); 
router.delete('/:id', (req, res) => itemPedidoController.deletar(req, res)); 

export default router;
