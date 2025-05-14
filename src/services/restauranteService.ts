import Restaurante from '../models/restauranteModel';

class RestauranteService {
  async criarRestaurante(data: any) {
    return await Restaurante.create(data);
  }

  async obterRestaurantes() {
    return await Restaurante.findAll();
  }

  async obterRestaurantePorId(id: number) {
    return await Restaurante.findByPk(id);
  }

  async atualizarRestaurante(id: number, updates: any) {
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) return null;
    return await restaurante.update(updates);
  }

  async deletarRestaurante(id: number) {
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) return null;
    await restaurante.destroy();
    return restaurante;
  }
}

export const restauranteService = new RestauranteService();