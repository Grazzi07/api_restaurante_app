import { Request, Response } from 'express';
import { restauranteService } from '../services/restauranteService';

class RestauranteController {
  async criar(req: Request, res: Response) {
    const { proprietario_id, nome_restaurante, descricao, categoria, endereco, cidade, estado, cep, telefone, imagem_url } = req.body;
    try {
      const restaurante = await restauranteService.criarRestaurante({
        proprietario_id,
        nome_restaurante,
        descricao,
        categoria,
        endereco,
        cidade,
        estado,
        cep,
        telefone,
        imagem_url,
      });
      res.status(201).json(restaurante);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }


  async listar(req: Request, res: Response) {
    try {
      const restaurantes = await restauranteService.obterRestaurantes();
      res.status(200).json(restaurantes);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const restaurante = await restauranteService.obterRestaurantePorId(parseInt(id, 10));
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome_restaurante, descricao, categoria, endereco, cidade, estado, cep, telefone, imagem_url } = req.body;
    try {
      const restaurante = await restauranteService.atualizarRestaurante(parseInt(id, 10), {
        nome_restaurante,
        descricao,
        categoria,
        endereco,
        cidade,
        estado,
        cep,
        telefone,
        imagem_url,
      });
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await restauranteService.deletarRestaurante(parseInt(id, 10));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}

export const restauranteController = new RestauranteController();