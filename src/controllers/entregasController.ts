import { Request, Response } from 'express';
import { entregaService } from '../services/entregaService';

class EntregaController {
 
  async criar(req: Request, res: Response): Promise<void> {
    const { pedido_id, entregador_id, status } = req.body;
  

    if (!pedido_id) {
      res.status(400).json({ message: 'O campo pedido_id é obrigatório.' });
      return;
    }
  

    const statusPermitidos = ['pendente', 'em transporte', 'entregue', 'cancelado'];
    if (status && !statusPermitidos.includes(status)) {
      res.status(400).json({ message: `O campo status deve ser um dos seguintes valores: ${statusPermitidos.join(', ')}` });
      return;
    }
  
    try {
    
      const entrega = await entregaService.criarEntrega({ pedido_id, entregador_id, status });
      res.status(201).json(entrega);
    } catch (error) {
      console.error('Erro ao criar entrega:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar a entrega.' });
    }
  }


  async listar(req: Request, res: Response): Promise<void> {
    try {
      const entregas = await entregaService.obterEntregas();
      res.status(200).json(entregas);
    } catch (error) {
      console.error('Erro ao listar entregas:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar as entregas.' });
    }
  }


  async obterPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const entrega = await entregaService.obterEntregaPorId(parseInt(id, 10));
      if (!entrega) {
        res.status(404).json({ message: 'Entrega não encontrada.' });
        return;
      }
      res.status(200).json(entrega);
    } catch (error) {
      console.error('Erro ao obter entrega:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter a entrega.' });
    }
  }


  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const entregaAtualizada = await entregaService.atualizarEntrega(parseInt(id, 10), { status });
      if (!entregaAtualizada) {
        res.status(404).json({ message: 'Entrega não encontrada para atualização.' });
        return;
      }
      res.status(200).json(entregaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar entrega:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar a entrega.' });
    }
  }


  async deletar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const entregaDeletada = await entregaService.deletarEntrega(parseInt(id, 10));
      if (!entregaDeletada) {
        res.status(404).json({ message: 'Entrega não encontrada para exclusão.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar entrega:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar a entrega.' });
    }
  }
}

export const entregaController = new EntregaController();