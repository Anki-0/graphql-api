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
import { parseJSON } from 'date-fns';
import slugify from '../../lib/slugify/index.js';

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<string>;
  declare slug: string;
  declare title: string;
  declare 'sub-title': string;
  declare content: string;
  declare image: string;
  declare banner: string;
  declare status: string;
  declare publishedBy: ForeignKey<User['id']>;
  declare modifiedBy: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Post.belongsTo(models.user, {
      foreignKey: 'publishedBy',
      targetKey: 'id'
    });

    Post.hasMany(models.comment, {
      foreignKey: 'post_id',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    Post.belongsToMany(models.tag, {
      through: models.posts_tags_junction,
      foreignKey: 'post_id'
      // sourceKey: 'id'
    });
    Post.hasMany(models.clap, {
      sourceKey: 'id',
      foreignKey: 'post_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      },
      'sub-title': {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          max: 140
        }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          min: 0,
          max: 140
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        validate: {
          vaidateImage(URL: string) {
            const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

            if (!URL.match(regex)) {
              throw new Error('Image URL is Valid!!.');
            }
          }
        }
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      status: {
        type: DataTypes.ENUM,
        values: ['published', 'private', 'draft'],
        defaultValue: 'published',
        allowNull: false
      },
      publishedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      modifiedBy: { type: DataTypes.UUID, allowNull: true },
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
      hooks: {
        beforeCreate(post, options) {
          if (!post.status) {
            post.status = 'draft';
          }
          if (post.title) {
            post.title = post.title.trim();
            post.slug = slugify(post.title, { lower: true, strict: true });
          }
          if (post['sub-title']) {
            post['sub-title'] = post['sub-title'].trim();
          }
          if (post.content) {
            post.content = post.content.trim();
          }
          if (post.banner) {
            post.banner = post.banner.trim();
          }
          if (!post.createdAt) {
            post.createdAt = parseJSON(Date.now());
          }
        }
      },
      sequelize,
      modelName: 'post',
      timestamps: false
    }
  );

  return Post;
};
