import Entrega from '../models/entregaModel';

class EntregaService {
  async criarEntrega(data: any) {
    return await Entrega.create(data); 
  }

  async obterEntregas() {
    return await Entrega.findAll();
  }

  async obterEntregaPorId(id: number) {
    return await Entrega.findByPk(id);
  }

  async atualizarEntrega(id: number, updates: any) {
    const entrega = await Entrega.findByPk(id);
    if (!entrega) return null;
    return await entrega.update(updates);
  }

  async deletarEntrega(id: number) {
    const entrega = await Entrega.findByPk(id);
    if (!entrega) return null;
    await entrega.destroy();
    return entrega;
  }
}

export const entregaService = new EntregaService();