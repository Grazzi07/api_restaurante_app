import CategoriaProduto from '../models/categoriaProdutoModel';

class CategoriaProdutoService {
  async criarCategoria(data: any) {
    return await CategoriaProduto.create(data);
  }

  async obterCategorias() {
    return await CategoriaProduto.findAll();
  }

  async obterCategoriaPorId(id: number) {
    return await CategoriaProduto.findByPk(id);
  }

  async atualizarCategoria(id: number, updates: any) {
    const categoria = await CategoriaProduto.findByPk(id);
    if (!categoria) return null;
    return await categoria.update(updates);
  }

  async deletarCategoria(id: number) {
    const categoria = await CategoriaProduto.findByPk(id);
    if (!categoria) return null;
    await categoria.destroy();
    return categoria;
  }
}

export const categoriaprodutoService = new CategoriaProdutoService();