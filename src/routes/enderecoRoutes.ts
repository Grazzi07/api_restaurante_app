import { Router, Request, Response } from 'express';
import { enderecoController } from '../controllers/enderecoController';

const router = Router();

router.post('/', (req, res) => enderecoController.criar(req, res)); 
router.get('/', (req, res) => enderecoController.listar(req, res)); 
router.get('/:id', async (req: Request, res: Response) => {await enderecoController.obterPorId(req, res)});
router.put('/:id', async (req: Request, res: Response) => {await enderecoController.atualizar(req, res)}); 
router.delete('/:id', async (req: Request, res: Response) => {await enderecoController.deletar(req, res)}); 

export default router;