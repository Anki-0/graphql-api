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

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<string>;
  declare post_id: ForeignKey<Post['id']>;
  declare user_id: ForeignKey<User['id']>;
  declare comment: string;
  declare like_count: number;
  declare dislike_count: number;
  declare approved: boolean;
  declare pinned: boolean;
  declare parent_id: ForeignKey<Comment['id']>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Comment.belongsTo(models.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      post_id: { type: DataTypes.UUID },
      user_id: { type: DataTypes.UUID },
      comment: { type: DataTypes.TEXT },
      like_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      dislike_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
      approved: { type: DataTypes.BOOLEAN, defaultValue: true },
      parent_id: { type: DataTypes.UUID },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: 'comments',
      timestamps: false
    }
  );
  return Comment;
};
