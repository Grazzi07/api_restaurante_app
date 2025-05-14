import { Request, Response } from 'express';
import { entregadorController } from '../../src/controllers/entregadorController';
import Entregador from '../../src/models/entregadorModel';

jest.mock('../../src/models/entregadorModel'); // Mock do modelo Entregador

describe('EntregadorController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um entregador com sucesso', async () => {
    const req = {
      body: {
        nome: 'João Silva',
        telefone: '123456789',
        veiculo: 'Moto',
        placa: 'ABC-1234',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entregador.create as jest.Mock).mockResolvedValue(req.body);

    await entregadorController.criar(req, res);

    expect(Entregador.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os entregadores', async () => {
    const entregadoresMock = [
      { id: 1, nome: 'João Silva', telefone: '123456789', veiculo: 'Moto', placa: 'ABC-1234' },
      { id: 2, nome: 'Maria Souza', telefone: '987654321', veiculo: 'Carro', placa: 'XYZ-5678' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entregador.findAll as jest.Mock).mockResolvedValue(entregadoresMock);

    await entregadorController.listar(req, res);

    expect(Entregador.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entregadoresMock);
  });

  it('deve retornar um entregador por ID', async () => {
    const entregadorMock = { id: 1, nome: 'João Silva', telefone: '123456789', veiculo: 'Moto', placa: 'ABC-1234' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entregador.findByPk as jest.Mock).mockResolvedValue(entregadorMock);

    await entregadorController.obterPorId(req, res);

    expect(Entregador.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entregadorMock);
  });

  it('deve atualizar um entregador', async () => {
    const entregadorMock = {
      id: 1,
      nome: 'João Silva',
      telefone: '123456789',
      veiculo: 'Moto',
      placa: 'ABC-1234',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { nome: 'João Atualizado', telefone: '987654321' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entregador.findByPk as jest.Mock).mockResolvedValue(entregadorMock);

    await entregadorController.atualizar(req, res);

    expect(Entregador.findByPk).toHaveBeenCalledWith(1);
    expect(entregadorMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um entregador', async () => {
    const entregadorMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Entregador.findByPk as jest.Mock).mockResolvedValue(entregadorMock);

    await entregadorController.deletar(req, res);

    expect(Entregador.findByPk).toHaveBeenCalledWith(1);
    expect(entregadorMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});