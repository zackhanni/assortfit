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
  "red",
  "pink",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "black",
  "grey",
  "white",
  "beige",
]);

export const SEASON_ENUM = pgEnum("season", [
  "summer",
  "fall",
  "winter",
  "spring",
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
  // lifecycle: LIFECYCLE_ENUM("lifecycle"),

  // I may want to make these dedicated tables in the future
  colors: COLOR_ENUM("color").array(),
  // seasons: SEASON_ENUM("season").array(),
  // occasions: OCCASION_ENUM("occasion").array(),
  notes: text("notes").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

//

// Example clothing query
// SELECT * FROM clothing WHERE 'RED' = ANY(colors);
// or
// SELECT * FROM clothing WHERE colors && ARRAY['RED', 'BLACK'];

//

// delete or edit below after finishing demo
export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
