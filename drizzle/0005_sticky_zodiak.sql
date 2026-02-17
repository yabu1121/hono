ALTER TABLE "cities" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "cities" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "invitee" integer;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_invitee_users_id_fk" FOREIGN KEY ("invitee") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";