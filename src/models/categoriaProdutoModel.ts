import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class CategoriaProduto extends Model {}

CategoriaProduto.init(
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
    descricao: {
      type: DataTypes.TEXT,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'CategoriaProduto',
    tableName: 'categorias_produto',
    timestamps: false,
  }
);

export default CategoriaProduto;