import { Router, Request, Response } from 'express';
import { entregadorController } from '../controllers/entregadorController';

const router = Router();


router.post('/', (req: Request, res: Response) => entregadorController.criar(req, res));


router.get('/', (req: Request, res: Response) => entregadorController.listar(req, res));


router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const entregador = await entregadorController.obterPorId(req, res);
    if (!entregador) {
      res.status(404).json({ message: 'Entregador não encontrado.' });
      return;
    }
    res.status(200).json(entregador);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o entregador.' });
  }
});


router.put('/:id', (req: Request, res: Response) => {
  (async () => {
    try {
      const entregadorAtualizado = await entregadorController.atualizar(req, res);
      if (!entregadorAtualizado) {
        res.status(404).json({ message: 'Entregador não encontrado para atualização.' });
        return;
      }
      res.status(200).json(entregadorAtualizado);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o entregador.' });
    }
  })();
});


router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await entregadorController.deletar(req, res);
    if (!resultado) {
      res.status(404).json({ message: 'Entregador não encontrado para exclusão.' });
      return;
    }
    res.status(200).json({ message: 'Entregador deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o entregador.' });
  }
});

export default router;