import { Router, Request, Response } from 'express';
import { pedidoController } from '../controllers/pedidoController';

const router = Router();
router.post('/', (req, res) => pedidoController.criar(req, res));
router.get('/', (req, res) => pedidoController.listar(req, res));
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const result = await pedidoController.obterPorId(req, res);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}); 
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const result = await pedidoController.atualizar(req, res);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}); 
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		await pedidoController.deletar(req, res);
		res.status(200).json({ message: 'Pedido deletado com sucesso' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}); 

export default router;