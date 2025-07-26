ALTER TABLE "hotels" ADD COLUMN "price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "amenities" text;--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "room_name" varchar(150);