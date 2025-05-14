import { Request, Response } from 'express';
import { entregaController } from '../../src/controllers/entregasController';
import Entrega from '../../src/models/entregaModel';

jest.mock('../../src/models/entregaModel'); // Mock do modelo Entrega

describe('EntregaController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar uma entrega com sucesso', async () => {
    const req = {
      body: {
        pedido_id: 1,
        entregador_id: 2,
        status: 'pendente',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entrega.create as jest.Mock).mockResolvedValue(req.body);

    await entregaController.criar(req, res);

    expect(Entrega.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todas as entregas', async () => {
    const entregasMock = [
      { id: 1, pedido_id: 1, entregador_id: 2, status: 'pendente' },
      { id: 2, pedido_id: 2, entregador_id: 3, status: 'em transporte' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entrega.findAll as jest.Mock).mockResolvedValue(entregasMock);

    await entregaController.listar(req, res);

    expect(Entrega.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entregasMock);
  });

  it('deve retornar uma entrega por ID', async () => {
    const entregaMock = { id: 1, pedido_id: 1, entregador_id: 2, status: 'pendente' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entrega.findByPk as jest.Mock).mockResolvedValue(entregaMock);

    await entregaController.obterPorId(req, res);

    expect(Entrega.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entregaMock);
  });

  it('deve atualizar uma entrega', async () => {
    const entregaMock = {
      id: 1,
      pedido_id: 1,
      entregador_id: 2,
      status: 'pendente',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { status: 'em transporte' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Entrega.findByPk as jest.Mock).mockResolvedValue(entregaMock);

    await entregaController.atualizar(req, res);

    expect(Entrega.findByPk).toHaveBeenCalledWith(1);
    expect(entregaMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar uma entrega', async () => {
    const entregaMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Entrega.findByPk as jest.Mock).mockResolvedValue(entregaMock);

    await entregaController.deletar(req, res);

    expect(Entrega.findByPk).toHaveBeenCalledWith(1);
    expect(entregaMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});