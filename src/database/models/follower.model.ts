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

export class Follow extends Model<InferAttributes<Follow>, InferCreationAttributes<Follow>> {
  declare follower_id: ForeignKey<User['id']>;
  declare followee_id: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Follow.belongsTo(models.user, {
      foreignKey: 'follower_id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Follow.belongsTo(models.user, {
      foreignKey: 'followee_id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Follow.init(
    {
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      followee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
      modelName: 'follower',
      timestamps: false
    }
  );
  return Follow;
};
