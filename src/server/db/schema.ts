// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import {
  index,
  pgTableCreator,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mytransfer_${name}`)

export const uploadedFilesTable = createTable(
  "uploaded_files",
  {
    key: varchar("key", { length: 128 }).primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 128 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    size: integer("size").notNull(),
  },
  (example) => ({
    userIdIndex: index("userId_idx").on(example.userId),
    createdAtIndex: index("created_at_idx").on(example.createdAt),
  }),
)
