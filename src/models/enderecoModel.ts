import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuarioModel';

class Endereco extends Model {}

Endereco.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Usuario, key: 'id' },
    },
    apelido: { type: DataTypes.STRING },
    endereco: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    cep: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 8) },
    longitude: { type: DataTypes.DECIMAL(11, 8) },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'Endereco', tableName: 'enderecos', timestamps: false }
);

Endereco.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Endereco, { foreignKey: 'usuario_id' });

export default Endereco;