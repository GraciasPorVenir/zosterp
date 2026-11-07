import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { roles } from "./roles.js";
import { entities } from "./entities.js";

export const affiliations = sqliteTable("affiliations", {
  entityId: text()
    .notNull()
    .references(() => entities.id, { onDelete: "cascade" })
    .primaryKey(),
  roleId: text()
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" })
    .primaryKey(),
  createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
  deletedAt: integer({ mode: "timestamp_ms" }),
});
