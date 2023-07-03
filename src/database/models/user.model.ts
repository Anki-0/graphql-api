import {
  Model,
  Sequelize,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes
} from 'sequelize';

import { DataTypes } from '../../utils/type.js';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  // [x: string]: any;
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare user_role: string;
  declare email_verified?: Date;
  declare name?: string;
  declare image?: string;
  declare address?: string;
  declare birthdate?: Date;
  declare bio?: string;
  declare phone_number?: number;
  declare user_token_expat?: Date;
  declare user_token?: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;

  static associate(models: any) {
    User.hasMany(models.account, {
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
    User.hasMany(models.post, {
      foreignKey: 'publishedBy',
      sourceKey: 'id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    User.belongsToMany(models.tag, {
      through: models.users_tags_junction,
      foreignKey: 'user_id'
      // sourceKey: 'id'
    });
    User.hasMany(models.follower, {
      foreignKey: 'followerId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.follower, {
      foreignKey: 'followerId',
      sourceKey: 'id',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.clap, {
      foreignKey: 'clappedBy',
      sourceKey: 'id'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
      },
      name: { type: DataTypes.STRING(63) },
      birthdate: { type: DataTypes.DATEONLY },
      username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      user_role: { type: DataTypes.STRING(15), allowNull: false },
      bio: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      phone_number: { type: DataTypes.STRING(13) },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      email_verified: { type: DataTypes.DATE },
      user_token: { type: DataTypes.STRING(191) },
      user_token_expat: { type: DataTypes.DATE },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: false
    }
  );

  return User;
};
