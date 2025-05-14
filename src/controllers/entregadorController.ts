import { Request, Response } from 'express';
import Entregador from '../models/entregadorModel';

class EntregadorController {
  async criar(req: Request, res: Response) {
    const { nome, telefone, veiculo, placa } = req.body;
    try {
      const entregador = await Entregador.create({
        nome,
        telefone,
        veiculo,
        placa,
      });
      res.status(201).json(entregador);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar o entregador.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const entregadores = await Entregador.findAll();
      res.status(200).json(entregadores);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar os entregadores.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const entregador = await Entregador.findByPk(parseInt(id, 10));
      if (!entregador) {
        return res.status(404).json({ message: 'Entregador não encontrado.' });
      }
      res.status(200).json(entregador);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter o entregador.' });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, telefone, veiculo, placa, status } = req.body;
    try {
      const entregador = await Entregador.findByPk(parseInt(id, 10));
      if (!entregador) {
        return res.status(404).json({ message: 'Entregador não encontrado para atualização.' });
      }
      const entregadorAtualizado = await entregador.update({
        nome,
        telefone,
        veiculo,
        placa,
        status,
      });
      res.status(200).json(entregadorAtualizado);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar o entregador.' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const entregador = await Entregador.findByPk(parseInt(id, 10));
      if (!entregador) {
        return res.status(404).json({ message: 'Entregador não encontrado para exclusão.' });
      }
      await entregador.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar o entregador.' });
    }
  }
}

export const entregadorController = new EntregadorController();