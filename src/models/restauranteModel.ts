import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Restaurante extends Model {
  public id!: number;
  public proprietario_id!: number;
  public nome_restaurante!: string;
  public descricao!: string;
  public categoria!: string;
  public endereco!: string;
  public cidade!: string;
  public estado!: string;
  public cep!: string;
  public telefone!: string;
  public imagem_url!: string;
}

Restaurante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proprietario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome_restaurante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    categoria: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    imagem_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Restaurante', 
    tableName: 'restaurantes',
    timestamps: false,
  }
);

export default Restaurante;