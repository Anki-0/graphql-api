import { Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataTypes } from '../../utils/type.js';

export class VerificationToken extends Model<
  InferAttributes<VerificationToken>,
  InferCreationAttributes<VerificationToken>
> {
  declare token: string;
  declare identifier: string;
  declare operation: string;
  declare expires: Date;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  VerificationToken.init(
    {
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      identifier: { type: DataTypes.STRING, allowNull: false },
      operation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expires: { type: DataTypes.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: 'verification_token',
      timestamps: false
    }
  );
  return VerificationToken;
};
