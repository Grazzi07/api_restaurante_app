import { Request, Response } from 'express';
import { avaliacaoController } from '../../src/controllers/avaliacaoController';
import Avaliacao from '../../src/models/avaliacaoModels';

jest.mock('../../src/models/avaliacaoModels'); // Mock do modelo Avaliacao

describe('AvaliacaoController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve criar uma avaliação com sucesso', async () => {
    const req = {
      body: {
        usuario_id: 1,
        restaurante_id: 2,
        nota: 5,
        comentario: 'Ótimo restaurante!',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Avaliacao.create as jest.Mock).mockResolvedValue(req.body);

    await avaliacaoController.criar(req, res);

    expect(Avaliacao.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('deve listar todas as avaliações', async () => {
    const avaliacoesMock = [
      { id: 1, usuario_id: 1, restaurante_id: 2, nota: 5, comentario: 'Ótimo restaurante!' },
      { id: 2, usuario_id: 3, restaurante_id: 4, nota: 4, comentario: 'Muito bom!' },
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Avaliacao.findAll as jest.Mock).mockResolvedValue(avaliacoesMock);

    await avaliacaoController.listar(req, res);

    expect(Avaliacao.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(avaliacoesMock);
  });

  it('deve retornar uma avaliação por ID', async () => {
    const avaliacaoMock = { id: 1, usuario_id: 1, restaurante_id: 2, nota: 5, comentario: 'Ótimo restaurante!' };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (Avaliacao.findByPk as jest.Mock).mockResolvedValue(avaliacaoMock);

    await avaliacaoController.obterPorId(req, res);

    expect(Avaliacao.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(avaliacaoMock);
  });

  it('deve atualizar uma avaliação', async () => {
    const avaliacaoMock = {
      id: 1,
      usuario_id: 1,
      restaurante_id: 2,
      nota: 5,
      comentario: 'Ótimo restaurante!',
      update: jest.fn().mockResolvedValue(true),
    };
  
    const req = {
      params: { id: '1' },
      body: { nota: 4, comentario: 'Muito bom!' },
    } as unknown as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    (Avaliacao.findByPk as jest.Mock).mockResolvedValue(avaliacaoMock);
  
  
    expect(Avaliacao.findByPk).toHaveBeenCalledWith(1);
    expect(avaliacaoMock.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it('deve deletar uma avaliação', async () => {
    const avaliacaoMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (Avaliacao.findByPk as jest.Mock).mockResolvedValue(avaliacaoMock);

    await avaliacaoController.deletar(req, res);

    expect(Avaliacao.findByPk).toHaveBeenCalledWith(1);
    expect(avaliacaoMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});