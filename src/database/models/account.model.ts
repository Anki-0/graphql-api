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
import { createScryptHash } from '../../auth/lib/helpers.js';

export class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  declare id?: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>;
  declare provider_type: string;
  declare provider: string;
  declare provider_account_id: string;
  declare refresh_token?: string;
  declare access_token?: string;
  declare expires_at?: Date;
  declare token_type?: string;
  declare scope?: string;
  declare id_token?: string;
  declare session_state?: string;
  declare status?: string;
  declare password?: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Account.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  Account.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      provider_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      provider: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      provider_account_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      refresh_token: {
        type: DataTypes.STRING
      },
      access_token: {
        type: DataTypes.STRING
      },
      expires_at: {
        type: DataTypes.DATE
      },
      token_type: {
        type: DataTypes.STRING
      },
      scope: {
        type: DataTypes.STRING
      },
      id_token: {
        type: DataTypes.STRING
      },
      session_state: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'account',
      timestamps: false,
      hooks: {
        beforeCreate: async (account, options) => {
          if (account.password) {
            const { salt, hashedKeyBuffer } = await createScryptHash(
              account.password
            );

            account.password = salt + '|' + hashedKeyBuffer.toString('hex');
          }
        }
      }
    }
  );
  return Account;
};
