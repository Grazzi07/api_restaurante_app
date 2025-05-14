import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Entregador extends Model {}

Entregador.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    veiculo: { type: DataTypes.ENUM('moto', 'bicicleta', 'carro'), allowNull: false },
    placa: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM('disponivel', 'em entrega', 'indisponivel'),
      defaultValue: 'disponivel',
    },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'Entregador', tableName: 'entregadores', timestamps: false }
);

export default Entregador;