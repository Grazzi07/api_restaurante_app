import Endereco from '../models/enderecoModel';

class EnderecoService {
  async criarEndereco(data: any) {
    return await Endereco.create(data);
  }

  async listarEnderecos() {
    return await Endereco.findAll();
  }

  async obterEnderecoPorId(id: number) {
    return await Endereco.findByPk(id);
  }

  async atualizarEndereco(id: number, updates: any) {
    const endereco = await Endereco.findByPk(id);
    if (!endereco) return null;
    return await endereco.update(updates);
  }

  async deletarEndereco(id: number) {
    const endereco = await Endereco.findByPk(id);
    if (!endereco) return null;
    await endereco.destroy();
    return endereco;
  }
}

export const enderecoService = new EnderecoService();