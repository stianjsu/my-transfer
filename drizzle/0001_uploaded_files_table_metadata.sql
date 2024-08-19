DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" ADD COLUMN "key" varchar(128) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" ADD COLUMN "userId" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" ADD COLUMN "size" integer NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "mytransfer_preview_uploaded_files" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "mytransfer_preview_uploaded_files" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "mytransfer_preview_uploaded_files" DROP COLUMN IF EXISTS "updated_at";