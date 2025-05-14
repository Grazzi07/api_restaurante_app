import Usuario from '../models/usuarioModel';

class UsuarioService {
  async criarUsuario(nome: string, email: string, telefone: string, tipo: string) {
    return await Usuario.create({ nome, email, telefone, tipo });
  }

  async obterUsuarios() {
    return await Usuario.findAll();
  }

  async obterUsuarioPorId(id: number) {
    return await Usuario.findByPk(id);
  }

  async atualizarUsuario(id: number, updates: any) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    return await usuario.update(updates);
  }

  async deletarUsuario(id: number) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.destroy();
    return usuario;
  }
}

export const usuarioService = new UsuarioService();