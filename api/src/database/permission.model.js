import sequelize from "./connection.js";
import { DataTypes } from "sequelize";

const Permission = sequelize.define(
  "Permission",
  {
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: "companies",
        key: "id",
      },
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(4),
      unique: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    underscored: true,
  },
);

export default Permission;
