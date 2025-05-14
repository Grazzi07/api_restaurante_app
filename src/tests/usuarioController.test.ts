import { Request, Response } from 'express';
import { usuarioController } from '../../src/controllers/usuarioController';
import Usuario from '../../src/models/usuarioModel';

jest.mock('../../src/models/usuarioModel'); // Mock do modelo Usuario

describe('UsuarioController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um usuário com sucesso', async () => {
    const req = {
      body: {
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: '123456',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Usuario.create as jest.Mock).mockResolvedValue(req.body);

    await usuarioController.criar(req, res);

    expect(Usuario.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os usuários', async () => {
    const usuariosMock = [
      { id: 1, nome: 'João Silva', email: 'joao@email.com' },
      { id: 2, nome: 'Maria Souza', email: 'maria@email.com' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Usuario.findAll as jest.Mock).mockResolvedValue(usuariosMock);

    await usuarioController.listar(req, res);

    expect(Usuario.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuariosMock);
  });

  it('deve retornar um usuário por ID', async () => {
    const usuarioMock = { id: 1, nome: 'João Silva', email: 'joao@email.com' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Usuario.findByPk as jest.Mock).mockResolvedValue(usuarioMock);

    await usuarioController.obterPorId(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuarioMock);
  });

  it('deve atualizar um usuário', async () => {
    const usuarioMock = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: '123456',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { nome: 'João Atualizado', email: 'joao.atualizado@email.com' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Usuario.findByPk as jest.Mock).mockResolvedValue(usuarioMock);

    await usuarioController.atualizar(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(usuarioMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um usuário', async () => {
    const usuarioMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Usuario.findByPk as jest.Mock).mockResolvedValue(usuarioMock);

    await usuarioController.deletar(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(usuarioMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});