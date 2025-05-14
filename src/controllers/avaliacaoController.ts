import { Request, Response } from 'express';
import Avaliacao from '../models/avaliacaoModels';

class AvaliacaoController {
  async criar(req: Request, res: Response) {
    const { usuario_id, restaurante_id, nota, comentario } = req.body;
    try {
      const avaliacao = await Avaliacao.create({
        usuario_id,
        restaurante_id,
        nota,
        comentario,
      });
      res.status(201).json(avaliacao);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar a avaliação.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const avaliacoes = await Avaliacao.findAll();
      res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar as avaliações.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const avaliacao = await Avaliacao.findByPk(parseInt(id, 10));
      if (!avaliacao) {
        return res.status(404).json({ message: 'Avaliação não encontrada.' });
      }
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter a avaliação.' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const avaliacao = await Avaliacao.findByPk(parseInt(id, 10));
      if (!avaliacao) {
        return res.status(404).json({ message: 'Avaliação não encontrada para exclusão.' });
      }
      await avaliacao.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar a avaliação.' });
    }
  }
}

export const avaliacaoController = new AvaliacaoController();