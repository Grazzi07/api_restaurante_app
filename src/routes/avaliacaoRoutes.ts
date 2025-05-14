import { Router, Request, Response } from 'express';
import { avaliacaoController } from '../controllers/avaliacaoController';

const router = Router();

router.post('/', (req, res) => avaliacaoController.criar(req, res)); 
router.get('/', (req, res) => avaliacaoController.listar(req, res));
router.get('/:id', async (req: Request, res: Response) => {
	try {
		await avaliacaoController.obterPorId(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});

router.delete('/:id', (req, res) => { avaliacaoController.deletar(req, res); });

export default router;