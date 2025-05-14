import { Request, Response } from 'express';
import { pedidoController } from '../../src/controllers/pedidoController';
import Pedido from '../../src/models/pedidoModel';

jest.mock('../../src/models/pedidoModel'); // Mock do modelo Pedido

describe('PedidoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um pedido com sucesso', async () => {
    const req = {
      body: {
        usuario_id: 1,
        restaurante_id: 2,
        total: 100.0,
        status: 'pendente',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Pedido.create as jest.Mock).mockResolvedValue(req.body);

    await pedidoController.criar(req, res);

    expect(Pedido.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os pedidos', async () => {
    const pedidosMock = [
      { id: 1, usuario_id: 1, restaurante_id: 2, total: 100.0, status: 'pendente' },
      { id: 2, usuario_id: 3, restaurante_id: 4, total: 200.0, status: 'finalizado' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Pedido.findAll as jest.Mock).mockResolvedValue(pedidosMock);

    await pedidoController.listar(req, res);

    expect(Pedido.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pedidosMock);
  });

  it('deve retornar um pedido por ID', async () => {
    const pedidoMock = { id: 1, usuario_id: 1, restaurante_id: 2, total: 100.0, status: 'pendente' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Pedido.findByPk as jest.Mock).mockResolvedValue(pedidoMock);

    await pedidoController.obterPorId(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pedidoMock);
  });

  it('deve atualizar um pedido', async () => {
    const pedidoMock = {
      id: 1,
      usuario_id: 1,
      restaurante_id: 2,
      total: 100.0,
      status: 'pendente',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { status: 'finalizado' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Pedido.findByPk as jest.Mock).mockResolvedValue(pedidoMock);

    await pedidoController.atualizar(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1);
    expect(pedidoMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um pedido', async () => {
    const pedidoMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Pedido.findByPk as jest.Mock).mockResolvedValue(pedidoMock);

    await pedidoController.deletar(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1);
    expect(pedidoMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});