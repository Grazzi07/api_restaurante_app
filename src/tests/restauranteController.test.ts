import { Request, Response } from 'express';
import { restauranteController } from '../../src/controllers/restauranteController';
import Restaurante from '../../src/models/restauranteModel';

jest.mock('../../src/models/restauranteModel'); // Mock do modelo Restaurante

describe('RestauranteController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar um restaurante com sucesso', async () => {
    const req = {
      body: {
        nome: 'Restaurante Saboroso',
        endereco: 'Rua das Flores, 123',
        telefone: '123456789',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Restaurante.create as jest.Mock).mockResolvedValue(req.body);

    await restauranteController.criar(req, res);

    expect(Restaurante.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todos os restaurantes', async () => {
    const restaurantesMock = [
      { id: 1, nome: 'Restaurante Saboroso', endereco: 'Rua das Flores, 123', telefone: '123456789' },
      { id: 2, nome: 'Restaurante Delícia', endereco: 'Avenida Central, 456', telefone: '987654321' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Restaurante.findAll as jest.Mock).mockResolvedValue(restaurantesMock);

    await restauranteController.listar(req, res);

    expect(Restaurante.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(restaurantesMock);
  });

  it('deve retornar um restaurante por ID', async () => {
    const restauranteMock = { id: 1, nome: 'Restaurante Saboroso', endereco: 'Rua das Flores, 123', telefone: '123456789' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Restaurante.findByPk as jest.Mock).mockResolvedValue(restauranteMock);

    await restauranteController.obterPorId(req, res);

    expect(Restaurante.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(restauranteMock);
  });

  it('deve atualizar um restaurante', async () => {
    const restauranteMock = {
      id: 1,
      nome: 'Restaurante Saboroso',
      endereco: 'Rua das Flores, 123',
      telefone: '123456789',
      update: jest.fn().mockResolvedValue(true),
    };

    const req = {
      params: { id: '1' },
      body: { nome: 'Restaurante Atualizado', telefone: '987654321' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Restaurante.findByPk as jest.Mock).mockResolvedValue(restauranteMock);

    await restauranteController.atualizar(req, res);

    expect(Restaurante.findByPk).toHaveBeenCalledWith(1);
    expect(restauranteMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar um restaurante', async () => {
    const restauranteMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Restaurante.findByPk as jest.Mock).mockResolvedValue(restauranteMock);

    await restauranteController.deletar(req, res);

    expect(Restaurante.findByPk).toHaveBeenCalledWith(1);
    expect(restauranteMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});