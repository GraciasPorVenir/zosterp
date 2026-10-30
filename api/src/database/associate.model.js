import sequelize from "./connection.js";
import { DataTypes } from "sequelize";

const Associate = sequelize.define(
  "Associate",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "associates",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: "roles",
        key: "id",
      },
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      references: {
        model: "tasks",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
  },
);

export default Associate;
