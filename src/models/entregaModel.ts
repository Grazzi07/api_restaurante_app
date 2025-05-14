import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Pedido from './pedidoModel';
import Entregador from './entregadorModel';

class Entrega extends Model {}

Entrega.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: 'id',
      },
    },
    entregador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Entregador,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pendente', 'em transporte', 'entregue', 'cancelado'),
      defaultValue: 'pendente',
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    atualizado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Entrega',
    tableName: 'entregas',
    timestamps: false,
  }
);

Entrega.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido.hasMany(Entrega, { foreignKey: 'pedido_id' });

Entrega.belongsTo(Entregador, { foreignKey: 'entregador_id' });
Entregador.hasMany(Entrega, { foreignKey: 'entregador_id' });

export default Entrega;