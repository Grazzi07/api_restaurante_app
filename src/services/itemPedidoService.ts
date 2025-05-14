import ItemPedido from '../models/itemPedidoModel';

class ItemPedidoService {
  // Criar um item de pedido
  async criarItemPedido(data: any) {
    const { pedido_id, produto_id, quantidade, preco_unitario } = data;
    const total = quantidade * preco_unitario;
    return await ItemPedido.create({
      pedido_id,
      produto_id,
      quantidade,
      preco_unitario,
      total,
    });
  }

  // Listar todos os itens de pedido
  async listarItensPedido() {
    return await ItemPedido.findAll();
  }

  // Obter um item de pedido por ID
  async obterItemPedidoPorId(id: number) {
    return await ItemPedido.findByPk(id);
  }

  // Atualizar um item de pedido
  async atualizarItemPedido(id: number, updates: any) {
    const itemPedido = await ItemPedido.findByPk(id);
    if (!itemPedido) {
      throw new Error('Item do pedido não encontrado.');
    }
    const { quantidade, preco_unitario } = updates;
    const total = quantidade * preco_unitario;
    return await itemPedido.update({ quantidade, preco_unitario, total });
  }

  // Deletar um item de pedido
  async deletarItemPedido(id: number) {
    const itemPedido = await ItemPedido.findByPk(id);
    if (!itemPedido) {
      throw new Error('Item do pedido não encontrado.');
    }
    await itemPedido.destroy();
    return itemPedido;
  }
}

export const itemPedidoService = new ItemPedidoService();