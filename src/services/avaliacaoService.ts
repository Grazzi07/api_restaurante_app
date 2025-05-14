import Avaliacao from '../models/avaliacaoModels';

class AvaliacaoService {
  async criarAvaliacao(data: any) {
    return await Avaliacao.create(data);
  }

  async obterAvaliacoes() {
    return await Avaliacao.findAll();
  }

  async obterAvaliacaoPorId(id: number) {
    return await Avaliacao.findByPk(id);
  }

  async deletarAvaliacao(id: number) {
    const avaliacao = await Avaliacao.findByPk(id);
    if (!avaliacao) return null;
    await avaliacao.destroy();
    return avaliacao;
  }
}

export const avaliacaoService = new AvaliacaoService();