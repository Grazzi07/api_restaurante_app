import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class ItemPedido extends Model {}

ItemPedido.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pedido_id: { type: DataTypes.INTEGER, allowNull: false },
    produto_id: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize, modelName: 'ItemPedido', tableName: 'itens_pedido', timestamps: false }
);

export default ItemPedido;