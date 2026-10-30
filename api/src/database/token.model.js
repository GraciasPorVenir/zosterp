import sequelize from "./connection.js";
import { DataTypes, Op } from "sequelize";

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    userAgent: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
  },
  {
    underscored: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ["user_agent", "user_id"] }],
    hooks: {
      afterDestroy: async function (token) {
        await Token.destroy({
          where: {
            userId: token.userId,
            userAgent: token.userAgent,
            [Op.ne]: token.id,
          },
          transaction: options.transaction,
        });
      },
    },
  },
);

export default Token;
