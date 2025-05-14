import Entregador from '../models/entregadorModel';

class EntregadorService {
  async criarEntregador(data: any) {
    return await Entregador.create(data);
  }

  async obterEntregadores() {
    return await Entregador.findAll();
  }

  async obterEntregadorPorId(id: number) {
    return await Entregador.findByPk(id);
  }

  async atualizarEntregador(id: number, updates: any) {
    const entregador = await Entregador.findByPk(id);
    if (!entregador) return null;
    return await entregador.update(updates);
  }

  async deletarEntregador(id: number) {
    const entregador = await Entregador.findByPk(id);
    if (!entregador) return null;
    await entregador.destroy();
    return entregador;
  }
}

export const entregadorService = new EntregadorService();