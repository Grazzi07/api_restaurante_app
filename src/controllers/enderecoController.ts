import { Request, Response } from 'express';
import { enderecoService } from '../services/enderecoService';

class EnderecoController {
  async criar(req: Request, res: Response) {
    const { usuario_id, apelido, endereco, cidade, estado, cep, latitude, longitude } = req.body;
    try {
      const novoEndereco = await enderecoService.criarEndereco({
        usuario_id,
        apelido,
        endereco,
        cidade,
        estado,
        cep,
        latitude,
        longitude,
      });
      res.status(201).json(novoEndereco);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao criar o endereço.' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const enderecos = await enderecoService.listarEnderecos();
      res.status(200).json(enderecos);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao listar os endereços.' });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const endereco = await enderecoService.obterEnderecoPorId(parseInt(id, 10));
      if (!endereco) {
        return res.status(404).json({ message: 'Endereço não encontrado.' });
      }
      res.status(200).json(endereco);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao obter o endereço.' });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { apelido, endereco, cidade, estado, cep, latitude, longitude } = req.body;
    try {
      const enderecoAtualizado = await enderecoService.atualizarEndereco(parseInt(id, 10), {
        apelido,
        endereco,
        cidade,
        estado,
        cep,
        latitude,
        longitude,
      });
      if (!enderecoAtualizado) {
        return res.status(404).json({ message: 'Endereço não encontrado para atualização.' });
      }
      res.status(200).json(enderecoAtualizado);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar o endereço.' });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const enderecoDeletado = await enderecoService.deletarEndereco(parseInt(id, 10));
      if (!enderecoDeletado) {
        return res.status(404).json({ message: 'Endereço não encontrado para exclusão.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro ao deletar o endereço.' });
    }
  }
}

export const enderecoController = new EnderecoController();