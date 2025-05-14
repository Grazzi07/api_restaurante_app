import { Request, Response } from 'express';
import { produtoController } from '../../src/controllers/produtoController';
import Produto from '../../src/models/produtoModel';

jest.mock('../../src/models/produtoModel'); // Mock do modelo Produto

describe('ProdutoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um produto com sucesso', async () => {
    const req = {
      body: {
        nome: 'Pizza',
        preco: 50.0,
        categoria_id: 1,
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Produto.create as jest.Mock).mockResolvedValue(req.body);

    await produtoController.criar(req, res);

    expect(Produto.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os produtos', async () => {
    const produtosMock = [
      { id: 1, nome: 'Pizza', preco: 50.0, categoria_id: 1 },
      { id: 2, nome: 'Hambúrguer', preco: 30.0, categoria_id: 2 },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Produto.findAll as jest.Mock).mockResolvedValue(produtosMock);

    await produtoController.listar(req, res);

    expect(Produto.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(produtosMock);
  });

  it('deve retornar um produto por ID', async () => {
    const produtoMock = { id: 1, nome: 'Pizza', preco: 50.0, categoria_id: 1 };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Produto.findByPk as jest.Mock).mockResolvedValue(produtoMock);

    await produtoController.obterPorId(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(produtoMock);
  });

  it('deve atualizar um produto', async () => {
    const produtoMock = {
      id: 1,
      nome: 'Pizza',
      preco: 50.0,
      categoria_id: 1,
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { nome: 'Pizza Grande', preco: 60.0 },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Produto.findByPk as jest.Mock).mockResolvedValue(produtoMock);

    await produtoController.atualizar(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1);
    expect(produtoMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um produto', async () => {
    const produtoMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Produto.findByPk as jest.Mock).mockResolvedValue(produtoMock);

    await produtoController.deletar(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1);
    expect(produtoMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});