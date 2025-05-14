import { Request, Response } from 'express';
import Produto from '../models/produtoModel';
import Restaurante from '../models/restauranteModel';

class ProdutoController {
  async criar(req: Request, res: Response): Promise<void> {
    console.log('Requisição recebida:', req.body); 
    const { nome, preco, restaurante_id } = req.body;
    
    if (!nome || !preco || !restaurante_id) {
      res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
      return;
    }

    try {
 
      const restaurante = await Restaurante.findByPk(restaurante_id);
      if (!restaurante) {
        res.status(404).json({ message: 'Restaurante não encontrado.' });
        return;
      }

      // Cria o produto
      const produto = await Produto.create({ nome, preco, restaurante_id });
      res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao criar produto:', error); 
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await Produto.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        res.status(404).json({ message: 'Produto não encontrado.' });
        return;
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, preco } = req.body;

      const produto = await Produto.findByPk(id);
      if (!produto) {
        res.status(404).json({ message: 'Produto não encontrado.' });
        return;
      }

      produto.nome = nome ?? produto.nome;
      produto.preco = preco ?? produto.preco;

      await produto.save();
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        res.status(404).json({ message: 'Produto não encontrado.' });
        return;
      }

      await produto.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export const produtoController = new ProdutoController();
