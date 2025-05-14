import { Request, Response } from 'express';
import { enderecoController } from '../../src/controllers/enderecoController';
import Endereco from '../../src/models/enderecoModel';

jest.mock('../../src/models/enderecoModel'); // Mock do modelo Endereco

describe('EnderecoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um endereço com sucesso', async () => {
    const req = {
      body: {
        rua: 'Rua das Flores',
        numero: '123',

        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12345-678',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Endereco.create as jest.Mock).mockResolvedValue(req.body);

    await enderecoController.criar(req, res);

    expect(Endereco.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os endereços', async () => {
    const enderecosMock = [
      { id: 1, rua: 'Rua das Flores', numero: '123', cidade: 'São Paulo', estado: 'SP', cep: '12345-678' },
      { id: 2, rua: 'Rua dos Pinheiros', numero: '456', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '98765-432' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Endereco.findAll as jest.Mock).mockResolvedValue(enderecosMock);

    await enderecoController.listar(req, res);

    expect(Endereco.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(enderecosMock);
  });

  it('deve retornar um endereço por ID', async () => {
    const enderecoMock = { id: 1, rua: 'Rua das Flores', numero: '123', cidade: 'São Paulo', estado: 'SP', cep: '12345-678' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Endereco.findByPk as jest.Mock).mockResolvedValue(enderecoMock);

    await enderecoController.obterPorId(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(enderecoMock);
  });

  it('deve atualizar um endereço', async () => {
    const enderecoMock = {
      id: 1,
      rua: 'Rua das Flores',
      numero: '123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12345-678',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { rua: 'Rua das Rosas', numero: '456' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Endereco.findByPk as jest.Mock).mockResolvedValue(enderecoMock);

    await enderecoController.atualizar(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(enderecoMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um endereço', async () => {
    const enderecoMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Endereco.findByPk as jest.Mock).mockResolvedValue(enderecoMock);

    await enderecoController.deletar(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(enderecoMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});