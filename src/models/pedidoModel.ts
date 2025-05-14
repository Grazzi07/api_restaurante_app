import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ItemPedido from './itemPedidoModel';

class Pedido extends Model {
  public id!: number; // Adicione explicitamente o tipo do campo `id`
  public usuario_id!: number;
  public restaurante_id!: number;
  public endereco_id!: number;
  public total!: number;
  public metodo_pagamento!: string;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metodo_pagamento: {
      type: DataTypes.ENUM('cartao_credito', 'cartao_debito', 'dinheiro', 'pix'),
      allowNull: false,
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
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false,
  }
);

Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id', as: 'itens' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

export default Pedido;