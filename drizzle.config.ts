import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    database: "mytransfer",
    host: "localhost:5432",
    password: "4dJ4twWclXy-RxsC",
    user: "postgres"
  },
  tablesFilter: ["mytransfer_*"],
} satisfies Config;
