import {
  sqliteTable,
  text,
  foreignKey,
  integer,
} from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable(
  "tasks",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    parentId: text(),
    priority: integer().notNull(),
    code: integer().notNull(),
    name: text().notNull(),
    content: text(),
    deadline: text(),
    startedAt: integer({ mode: "timestamp_ms" }),
    finishedAt: integer({ mode: "timestamp_ms" }),
    createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
    updatedAt: integer({ mode: "timestamp_ms" }).$onUpdateFn(() => new Date()),
    deletedAt: integer({ mode: "timestamp_ms" }),
  },
  (t) => [
    foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
    }).onDelete("cascade"),
  ],
);
