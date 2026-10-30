import sequelize from "./connection.js";

import Associate from "./associate.model.js";
import Task from "./task.model.js";

import Permission from "./permission.model.js";
import Role from "./role.model.js";
import Company from "./company.model.js";

import Token from "./token.model.js";
import User from "./user.model.js";

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Company.hasMany(Role, { foreignKey: "companyId" });
Role.belongsTo(Company, { foreignKey: "companyId", onDelete: "CASCADE" });

Role.hasMany(Permission, { foreignKey: "roleId" });
Permission.belongsTo(Role, { foreignKey: "roleId", onDelete: "CASCADE" });

Role.hasMany(Associate, { foreignKey: "roleId" });
Associate.belongsTo(Role, { foreignKey: "roleId", onDelete: "CASCADE" });

User.hasMany(Associate, { foreignKey: "userId" });
Associate.belongsTo(User, { foreignKey: "userId" });

Task.hasMany(Associate, { foreignKey: "taskId" });
Associate.belongsTo(Task, { foreignKey: "taskId", onDelete: "CASCADE" });

export { sequelize, Associate, Company, Permission, Role, Task, Token, User };
