import sequelize from "./connection.js";
import { DataTypes } from "sequelize";

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cuit: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default Company;
