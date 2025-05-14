import Pedido from '../models/pedidoModel';
import ItemPedido from '../models/itemPedidoModel';

class PedidoService {
  async criarPedido(data: any) {
    const { usuario_id, restaurante_id, endereco_id, produtos, total, metodo_pagamento } = data;

    const pedido = await Pedido.create({
      usuario_id,
      restaurante_id,
      endereco_id,
      total,
      metodo_pagamento,
    });

    for (const produto of produtos) {
      await ItemPedido.create({
        pedido_id: pedido.id, 
        produto_id: produto.produto_id,
        quantidade: produto.quantidade,
        preco_unitario: produto.preco_unitario,
        total: produto.quantidade * produto.preco_unitario
      });
    }

    return pedido;
  }

  async obterPedidos() {
    return await Pedido.findAll({
      include: [
        {
          model: ItemPedido,
          as: 'itens', 
        },
      ],
    });
  }

  async obterPedidoPorId(id: number) {
    return await Pedido.findByPk(id, {
      include: [
        {
          model: ItemPedido,
          as: 'itens', 
        },
      ],
    });
  }

  async atualizarPedido(id: number, updates: any) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;
    return await pedido.update(updates);
  }

  async deletarPedido(id: number) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;
    await pedido.destroy();
    return pedido;
  }
}

export const pedidoService = new PedidoService();