import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres"
import postgres from "postgres"
import { sql } from "@vercel/postgres"

import * as schema from "./schema"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

let db_conn
if (process.env.NODE_ENV === "production") {
  db_conn = drizzleVercel(sql, { schema })
} else {
  const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL || "")
  globalForDb.conn = conn

  db_conn = drizzlePostgres(conn, { schema })
}

export const db = db_conn
