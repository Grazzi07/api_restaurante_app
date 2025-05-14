import { Request, Response } from 'express';
import { itemPedidoController } from '../../src/controllers/itemPedidoController';
import ItemPedido from '../../src/models/itemPedidoModel';

jest.mock('../../src/models/itemPedidoModel'); // Mock do modelo ItemPedido

describe('ItemPedidoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um item de pedido com sucesso', async () => {
    const req = {
      body: {
        pedido_id: 1,
        produto_id: 2,
        quantidade: 3,
        preco: 50.0,
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (ItemPedido.create as jest.Mock).mockResolvedValue(req.body);

    await itemPedidoController.criar(req, res);

    expect(ItemPedido.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os itens de pedido', async () => {
    const itensMock = [
      { id: 1, pedido_id: 1, produto_id: 2, quantidade: 3, preco: 50.0 },
      { id: 2, pedido_id: 1, produto_id: 3, quantidade: 1, preco: 30.0 },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (ItemPedido.findAll as jest.Mock).mockResolvedValue(itensMock);

    await itemPedidoController.listar(req, res);

    expect(ItemPedido.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(itensMock);
  });

  it('deve retornar um item de pedido por ID', async () => {
    const itemMock = { id: 1, pedido_id: 1, produto_id: 2, quantidade: 3, preco: 50.0 };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(itemMock);

    await itemPedidoController.obterPorId(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(itemMock);
  });

  it('deve atualizar um item de pedido', async () => {
    const itemMock = {
      id: 1,
      pedido_id: 1,
      produto_id: 2,
      quantidade: 3,
      preco: 50.0,
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { quantidade: 5, preco: 60.0 },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(itemMock);

    await itemPedidoController.atualizar(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1);
    expect(itemMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um item de pedido', async () => {
    const itemMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(itemMock);

    await itemPedidoController.deletar(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1);
    expect(itemMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});