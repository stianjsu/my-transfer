CREATE TABLE IF NOT EXISTS "mytransfer_uploaded_files" (
	"key" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"userId" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"size" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "mytransfer_uploaded_files" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "mytransfer_uploaded_files" USING btree ("created_at");