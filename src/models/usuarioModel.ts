import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Usuario extends Model {}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefone: { type: DataTypes.STRING },
    tipo: { type: DataTypes.ENUM('cliente', 'proprietario'), allowNull: false },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'Usuario', tableName: 'usuarios', timestamps: false }
);

export default Usuario;