import {
  Model,
  Sequelize,
  ForeignKey,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from 'sequelize';
import { DataTypes } from '../../utils/type.js';
import { User } from './user.model.js';
import { Post } from './post.model.js';

export class Claps extends Model<
  InferAttributes<Claps>,
  InferCreationAttributes<Claps>
> {
  declare id: CreationOptional<string>;
  declare post_id: ForeignKey<Post['id']>;
  declare clappedBy: ForeignKey<User['id']>;

  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Claps.belongsTo(models.post, { foreignKey: 'post_id', targetKey: 'id' });
    Claps.belongsTo(models.user, {
      foreignKey: 'clappedBy',
      targetKey: 'id'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Claps.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        onDelete: 'CASCADE'
      },
      clappedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'clap',
      timestamps: false
    }
  );

  return Claps;
};
