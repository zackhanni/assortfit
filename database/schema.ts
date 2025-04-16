import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const MEMBERSHIP_STATUS_ENUM = pgEnum("status", [
  "Active",
  "Inactive",
  "None",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]); // remove after demo

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(), // remove after demo
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(), // remove after demo
  status: MEMBERSHIP_STATUS_ENUM("status").default("None"),
  role: ROLE_ENUM("role").default("USER"),
  profileIsPublic: boolean("profile_is_public").default(false),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const COLOR_ENUM = pgEnum("color", [
  "RED",
  "PINK",
  "ORANGE",
  "YELLOW",
  "GREEN",
  "BLUE",
  "PURPLE",
  "BROWN",
  "BLACK",
  "GREY",
  "WHITE",
  "BEIGE",
]);

export const SEASON_ENUM = pgEnum("season", [
  "SUMMER",
  "FALL",
  "WINTER",
  "SPRING",
]);

export const CATEGORY_ENUM = pgEnum("category", [
  "top",
  "bottom",
  "jacket",
  "hat",
  "shoes",
  "socks",
  "accessory",
]);

export const OCCASION_ENUM = pgEnum("occasion", [
  "casual",
  "work",
  "formal",
  "workout",
  "lounge_wear",
]);

export const LIFECYCLE_ENUM = pgEnum("lifecycle", [
  "new",
  "in_use",
  "old",
  "replace",
  "retired",
]);

export const clothing = pgTable("clothing", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  brand: varchar("brand", { length: 255 }).notNull().default("Unknown"),
  category: CATEGORY_ENUM("category"),
  lifecycle: LIFECYCLE_ENUM("lifecycle"),

  // I want to make these dedicated tables in the future
  colors: COLOR_ENUM("color").array(),
  seasons: SEASON_ENUM("season").array(),
  occasion: OCCASION_ENUM("occasion").array(),

  imageUrl: text("image_url"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Example clothing query
// SELECT * FROM clothing WHERE 'RED' = ANY(colors);
// or
// SELECT * FROM clothing WHERE colors && ARRAY['RED', 'BLACK'];
