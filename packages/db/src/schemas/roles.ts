import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { entities } from "./entities.js";

export const roles = sqliteTable("roles", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  entityId: text()
    .notNull()
    .references(() => entities.id, { onDelete: "cascade" }),
  name: text().notNull(),
  isTaskRole: integer({ mode: "boolean" }).default(false),
  createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
  deletedAt: integer({ mode: "timestamp_ms" }),
});
