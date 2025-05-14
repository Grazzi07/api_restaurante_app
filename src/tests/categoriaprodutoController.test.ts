import { Request, Response } from 'express';
import { categoriaprodutoController } from '../../src/controllers/categoriaprodutoController';
import CategoriaProduto from '../../src/models/categoriaProdutoModel';

jest.mock('../../src/models/categoriaprodutoModel'); // Mock do modelo CategoriaProduto

describe('CategoriaProdutoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar uma categoria de produto com sucesso', async () => {
    const req = {
      body: {
        nome: 'Bebidas',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (CategoriaProduto.create as jest.Mock).mockResolvedValue(req.body);

    await categoriaprodutoController.criar(req, res);

    expect(CategoriaProduto.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todas as categorias de produtos', async () => {
    const categoriasMock = [
      { id: 1, nome: 'Bebidas' },
      { id: 2, nome: 'Comidas' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (CategoriaProduto.findAll as jest.Mock).mockResolvedValue(categoriasMock);

    await categoriaprodutoController.listar(req, res);

    expect(CategoriaProduto.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(categoriasMock);
  });

  it('deve retornar uma categoria de produto por ID', async () => {
    const categoriaMock = { id: 1, nome: 'Bebidas' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (CategoriaProduto.findByPk as jest.Mock).mockResolvedValue(categoriaMock);

    await categoriaprodutoController.obterPorId(req, res);

    expect(CategoriaProduto.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(categoriaMock);
  });

  it('deve atualizar uma categoria de produto', async () => {
    const categoriaMock = {
      id: 1,
      nome: 'Bebidas',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { nome: 'Bebidas Atualizado' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (CategoriaProduto.findByPk as jest.Mock).mockResolvedValue(categoriaMock);

    await categoriaprodutoController.atualizar(req, res);

    expect(CategoriaProduto.findByPk).toHaveBeenCalledWith(1);
    expect(categoriaMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar uma categoria de produto', async () => {
    const categoriaMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (CategoriaProduto.findByPk as jest.Mock).mockResolvedValue(categoriaMock);

    await categoriaprodutoController.deletar(req, res);

    expect(CategoriaProduto.findByPk).toHaveBeenCalledWith(1);
    expect(categoriaMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});