import { hash, compare, genSalt } from "bcrypt";
import sequelize from "./connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    hooks: {
      beforeValidate: async (user) => {
        if (user.changed("password"))
          user.passwordHash = await hash(user.password, await genSalt());
      },
    },
  },
);

User.prototype.checkPw = async function (pw) {
  return await compare(pw, user.passwordHash);
};

User.prototype.login = async function (email, pw) {
  const user = await User.findOne({ where: { email } });
  if (await user.checkPw(pw)) return user.dataValues;
  return null;
};

export default User;