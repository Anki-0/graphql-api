import { Model, Sequelize, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataTypes } from '../../utils/type.js';
import { Post } from './post.model.js';
import { Tag } from './tags.model.js';

export class Posts_Tags_Junction extends Model<
  InferAttributes<Posts_Tags_Junction>,
  InferCreationAttributes<Posts_Tags_Junction>
> {
  declare post_id: ForeignKey<Post['id']>;
  declare tag_id: ForeignKey<Tag['id']>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Posts_Tags_Junction.belongsTo(models.tag, { foreignKey: 'tag_id' });
    Posts_Tags_Junction.belongsTo(models.post, { foreignKey: 'post_id' });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Posts_Tags_Junction.init(
    {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        references: {
          model: 'posts',
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
      }
    },
    {
      sequelize,
      modelName: 'posts_tags_junction',
      timestamps: false
    }
  );
  return Posts_Tags_Junction;
};
