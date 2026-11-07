import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { roles } from "./roles.js";


export const permissions = sqliteTable("permissions", {
  roleId: text().notNull().references(() => roles.id, { onDelete: "cascade" }).primaryKey(),
  action: integer().notNull().primaryKey(),
  resource: integer().notNull().primaryKey()
});
