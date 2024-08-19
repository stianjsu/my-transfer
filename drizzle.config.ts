import { type Config } from "drizzle-kit"
import { env } from "./src/env"

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL!,
    user: env.POSTGRES_USER!,
    host: env.POSTGRES_HOST!,
    database: env.POSTGRES_DATABASE!,
    password: env.POSTGRES_PASSWORD!,
    ssl: env.VERCEL_ENV !== "development" ? "require" : undefined,
  },
  migrations: {
    schema: "public",
  },
  tablesFilter: [`mytransfer_*`],
} satisfies Config
