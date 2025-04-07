CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('top', 'bottom', 'jacket', 'hat', 'shoes', 'socks', 'accessory');--> statement-breakpoint
CREATE TYPE "public"."color" AS ENUM('RED', 'PINK', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'BROWN', 'BLACK', 'GREY', 'WHITE', 'BEIGE');--> statement-breakpoint
CREATE TYPE "public"."lifecycle" AS ENUM('new', 'in_use', 'old', 'replace', 'retired');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Active', 'Inactive', 'None');--> statement-breakpoint
CREATE TYPE "public"."occasion" AS ENUM('casual', 'work', 'formal', 'workout', 'lounge_wear');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."season" AS ENUM('SUMMER', 'FALL', 'WINTER', 'SPRING');--> statement-breakpoint
CREATE TABLE "clothing" (
	"user_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" varchar(255) DEFAULT 'Unknown' NOT NULL,
	"category" "category",
	"lifecycle" "lifecycle",
	"color" "color"[],
	"season" "season"[],
	"occasion" "occasion"[],
	"image_url" text,
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "clothing_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"university_id" integer NOT NULL,
	"password" text NOT NULL,
	"university_card" text NOT NULL,
	"status" "status" DEFAULT 'None',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_university_id_unique" UNIQUE("university_id")
);
--> statement-breakpoint
ALTER TABLE "clothing" ADD CONSTRAINT "clothing_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;