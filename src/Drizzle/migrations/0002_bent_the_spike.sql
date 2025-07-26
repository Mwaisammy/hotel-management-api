ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_code" varchar(255);--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "hotels" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "hotels" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";