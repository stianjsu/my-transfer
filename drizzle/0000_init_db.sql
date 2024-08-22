CREATE TABLE IF NOT EXISTS "mytransfer_preview_uploaded_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "mytransfer_preview_uploaded_files" USING btree ("name");