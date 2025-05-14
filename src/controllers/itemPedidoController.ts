import { Request, Response } from 'express';
import { itemPedidoService } from '../services/itemPedidoService';

class ItemPedidoController {
  async criar(req: Request, res: Response) {
    try {
      const itemPedido = await itemPedidoService.criarItemPedido(req.body);
      res.status(201).json(itemPedido);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar o item do pedido.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const itensPedido = await itemPedidoService.listarItensPedido();
      res.status(200).json(itensPedido);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar os itens do pedido.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params; 
    try {
      const itemPedido = await itemPedidoService.obterItemPedidoPorId(parseInt(id, 10));
      if (!itemPedido) {
        return res.status(404).json({ message: 'Item do pedido não encontrado.' }); 
      }
      res.status(200).json(itemPedido); 
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter o item do pedido.' }); 
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const itemAtualizado = await itemPedidoService.atualizarItemPedido(parseInt(req.params.id, 10), req.body);
      res.status(200).json(itemAtualizado);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar o item do pedido.' });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await itemPedidoService.deletarItemPedido(parseInt(req.params.id, 10));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar o item do pedido.' });
    }
  }
}

export const itemPedidoController = new ItemPedidoController();