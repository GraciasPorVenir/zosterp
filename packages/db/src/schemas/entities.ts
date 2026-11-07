import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";

export const entities = sqliteTable(
  "entities",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    legalName: text().notNull(),
    legalType: text().notNull(),
    cuit: text({ length: 11 }).notNull(),
    createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
    updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
    deletedAt: integer({ mode: "timestamp_ms" }),
  },
  (t) => [unique("idx_user_cuit").on(t.cuit, t.deletedAt)],
);
