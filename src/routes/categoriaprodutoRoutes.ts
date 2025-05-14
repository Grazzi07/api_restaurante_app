import { Router, Request, Response } from 'express';
import { categoriaprodutoController } from '../controllers/categoriaprodutoController';

const router = Router();

router.post('/', (req, res) => categoriaprodutoController.criar(req, res)); 
router.get('/', (req, res) => categoriaprodutoController.listar(req, res)); 
router.get('/:id', async (req, res) => {
	try {
		await categoriaprodutoController.obterPorId(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
}); 
router.put('/:id', async (req: Request, res: Response) => {
	try {
		await categoriaprodutoController.atualizar(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
}); 
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		await categoriaprodutoController.deletar(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
}); 

export default router;