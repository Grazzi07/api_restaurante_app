import { Request, Response } from 'express';
import { categoriaprodutoService } from '../services/categoriaprodutoService';

class CategoriaProdutoController {
  async criar(req: Request, res: Response) {
    const { nome, descricao } = req.body;
    try {
      const categoria = await categoriaprodutoService.criarCategoria({ nome, descricao });
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar a categoria.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const categorias = await categoriaprodutoService.obterCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar as categorias.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const categoria = await categoriaprodutoService.obterCategoriaPorId(parseInt(id, 10));
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter a categoria.' });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
      const categoriaAtualizada = await categoriaprodutoService.atualizarCategoria(parseInt(id, 10), { nome, descricao });
      if (!categoriaAtualizada) {
        return res.status(404).json({ message: 'Categoria não encontrada para atualização.' });
      }
      res.status(200).json(categoriaAtualizada);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar a categoria.' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const categoriaDeletada = await categoriaprodutoService.deletarCategoria(parseInt(id, 10));
      if (!categoriaDeletada) {
        return res.status(404).json({ message: 'Categoria não encontrada para exclusão.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar a categoria.' });
    }
  }
}

export const categoriaprodutoController = new CategoriaProdutoController();