import {
  Model,
  Sequelize,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from 'sequelize';
import { DataTypes } from '../../utils/type.js';

export class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare id: CreationOptional<string>;
  declare tag_name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Tag.belongsToMany(models.user, {
      through: models.users_tags_junction,
      foreignKey: 'tag_id'
    });
    Tag.hasMany(models.users_tags_junction, { foreignKey: 'tag_id' });
    Tag.belongsToMany(models.post, {
      through: models.posts_tags_junction,
      foreignKey: 'tag_id'
    });
    Tag.hasMany(models.posts_tags_junction, { foreignKey: 'tag_id' });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      tag_name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          parseText(value: string) {
            return value.trim().toLowerCase();
          }
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
      modelName: 'tag',
      timestamps: false
    }
  );
  return Tag;
};
