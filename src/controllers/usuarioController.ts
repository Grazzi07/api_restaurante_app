import { Request, Response } from 'express';
import { usuarioService } from '../services/usuarioService';

class UsuarioController {
  async criar(req: Request, res: Response): Promise<void> {
    const { nome, email, telefone, tipo } = req.body;
    try {
      const usuario = await usuarioService.criarUsuario(nome, email, telefone, tipo);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioService.obterUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.obterUsuarioPorId(parseInt(id, 10));
      if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, email, telefone, tipo } = req.body;
    try {
      const usuario = await usuarioService.atualizarUsuario(parseInt(id, 10), { nome, email, telefone, tipo });
      if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.deletarUsuario(parseInt(id, 10));
      if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export const usuarioController = new UsuarioController();