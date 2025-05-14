import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Produto extends Model {
  public id!: number;
  public nome!: string;
  public preco!: number;
  public restaurante_id!: number;
  public criado_em!: Date;
}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    timestamps: false,
  }
);

export default Produto;