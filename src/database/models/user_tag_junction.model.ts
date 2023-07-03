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
import { Tag } from './tags.model.js';

export class Users_Tags_Junction extends Model<
  InferAttributes<Users_Tags_Junction>,
  InferCreationAttributes<Users_Tags_Junction>
> {
  declare user_id: ForeignKey<User['id']>;
  declare tag_id: ForeignKey<Tag['id']>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    //  define association here
    Users_Tags_Junction.belongsTo(models.tag, { foreignKey: 'tag_id' });
    Users_Tags_Junction.belongsTo(models.user, { foreignKey: 'user_id' });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Users_Tags_Junction.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'tags',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: 'users_tags_junction',
      timestamps: false
    }
  );
  return Users_Tags_Junction;
};
