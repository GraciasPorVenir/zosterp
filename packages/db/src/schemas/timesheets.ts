import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { members } from "./members.js";

export const timesheets = sqliteTable("timesheets", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  creatorId: text()
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  observation: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
});
