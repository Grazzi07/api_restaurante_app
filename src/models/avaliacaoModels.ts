import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuarioModel';
import Restaurante from './restauranteModel';

class Avaliacao extends Model {}

Avaliacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurante,
        key: 'id',
      },
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comentario: {
      type: DataTypes.TEXT,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Avaliacao',
    tableName: 'avaliacoes',
    timestamps: false,
  }
);

Avaliacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Avaliacao, { foreignKey: 'usuario_id' });

Avaliacao.belongsTo(Restaurante, { foreignKey: 'restaurante_id' });
Restaurante.hasMany(Avaliacao, { foreignKey: 'restaurante_id' });

export default Avaliacao;