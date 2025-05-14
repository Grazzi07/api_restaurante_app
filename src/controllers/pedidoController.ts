import { Request, Response } from 'express';
import { pedidoService } from '../services/pedidoService';

class PedidoController {
  async criar(req: Request, res: Response) {
    const { usuario_id, restaurante_id, endereco_id, produtos, total, metodo_pagamento } = req.body;
    try {
      const pedido = await pedidoService.criarPedido({
        usuario_id,
        restaurante_id,
        endereco_id,
        produtos,
        total,
        metodo_pagamento,
      });
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar o pedido.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const pedidos = await pedidoService.obterPedidos();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar os pedidos.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pedido = await pedidoService.obterPedidoPorId(parseInt(id, 10));
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }
      res.status(200).json(pedido);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter o pedido.' });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const pedidoAtualizado = await pedidoService.atualizarPedido(parseInt(id, 10), { status });
      if (!pedidoAtualizado) {
        return res.status(404).json({ message: 'Pedido não encontrado para atualização.' });
      }
      res.status(200).json(pedidoAtualizado);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar o pedido.' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pedidoDeletado = await pedidoService.deletarPedido(parseInt(id, 10));
      if (!pedidoDeletado) {
        return res.status(404).json({ message: 'Pedido não encontrado para exclusão.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar o pedido.' });
    }
  }
}

export const pedidoController = new PedidoController();