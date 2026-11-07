import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { roles } from "./roles.js";
import { entities } from "./entities.js";

export const members = sqliteTable("members", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  entityId: text()
    .notNull()
    .references(() => entities.id, { onDelete: "cascade" }),
  roleId: text()
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
  deletedAt: integer({ mode: "timestamp_ms" }),
});
