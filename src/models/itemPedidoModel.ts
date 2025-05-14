import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ItemPedido extends Model {
  public id!: number;
  public pedido_id!: number;
  public produto_id!: number;
  public quantidade!: number;
  public preco_unitario!: number;
  public total!: number;
}

ItemPedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ItemPedido',
    tableName: 'itens_pedido',
    timestamps: false,
  }
);

export default ItemPedido;