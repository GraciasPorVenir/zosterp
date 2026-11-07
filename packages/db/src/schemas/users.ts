import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { entities } from "./entities.js";

export const users = sqliteTable(
  "users",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    entityId: text()
      .notNull()
      .references(() => entities.id, { onDelete: "cascade" }),
    email: text().notNull(),
    passwordHash: text().notNull(),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer({ mode: "timestamp_ms" })
      .$onUpdateFn(() => new Date())
      .notNull(),
    deletedAt: integer({ mode: "timestamp_ms" }),
  },
  (t) => [unique("idx_user_email").on(t.email, t.deletedAt)],
);

export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "passwordHash">;

