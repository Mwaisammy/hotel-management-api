import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  boolean,
  pgEnum,
  text,
  decimal,
  // primaryKey,
  // unique,
  // foreignKey,
} from "drizzle-orm/pg-core";

// ENUMS
export const userRoleEnum = pgEnum("role", ["user", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Pending", "Completed", "Failed"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["Open", "In Progress", "Resolved", "Closed"]);

// USERS
export const UsersTable = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  firstname: varchar("firstname", { length: 100 }),
  lastname: varchar("lastname", { length: 100 }),
  email: varchar("email", { length: 150 }).unique(),
  password: varchar("password", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  address: text("address"),
  role: userRoleEnum("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// HOTELS
export const HotelsTable = pgTable("hotels", {
  hotelId: serial("hotel_id").primaryKey(),
  name: varchar("name", { length: 200 }),
  location: varchar("location", { length: 200 }),
  address: text("address"),
  contactPhone: varchar("contact_phone", { length: 20 }),
  category: varchar("category", { length: 100 }),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// ROOMS
export const RoomsTable = pgTable("rooms", {
  roomId: serial("room_id").primaryKey(),
  hotelId: integer("hotel_id").references(() => HotelsTable.hotelId, { onDelete: "cascade" }).notNull(),
  roomType: varchar("room_type", { length: 100 }),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }),
  capacity: integer("capacity"),
  amenities: text("amenities"),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// BOOKINGS
export const BookingsTable = pgTable("bookings", {
  bookingId: serial("booking_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId, { onDelete: "cascade" }).notNull(),
  roomId: integer("room_id").references(() => RoomsTable.roomId, { onDelete: "cascade" }).notNull(),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  bookingStatus: bookingStatusEnum("booking_status").default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// PAYMENTS
export const PaymentsTable = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  bookingId: integer("booking_id").references(() => BookingsTable.bookingId, { onDelete: "cascade" }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  paymentStatus: paymentStatusEnum("payment_status").default("Pending"),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  transactionId: varchar("transaction_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// CUSTOMER SUPPORT TICKETS
export const SupportTicketsTable = pgTable("support_tickets", {
  ticketId: serial("ticket_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId, { onDelete: "cascade" }).notNull(),
  subject: varchar("subject", { length: 255 }),
  description: text("description"),
  status: ticketStatusEnum("ticket_status").default("Open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relationships
export const userRelations = relations(UsersTable, ({ many }) => ({
  bookings: many(BookingsTable),
  supportTickets: many(SupportTicketsTable),
}));

export const hotelRelations = relations(HotelsTable, ({ many }) => ({
  rooms: many(RoomsTable),
}));

export const roomRelations = relations(RoomsTable, ({ one, many }) => ({
  hotel: one(HotelsTable, {
    fields: [RoomsTable.hotelId],
    references: [HotelsTable.hotelId],
  }),
  bookings: many(BookingsTable),
}));

export const bookingRelations = relations(BookingsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [BookingsTable.userId],
    references: [UsersTable.userId],
  }),
  room: one(RoomsTable, {
    fields: [BookingsTable.roomId],
    references: [RoomsTable.roomId],
  }),
  payment: one(PaymentsTable, {
    fields: [BookingsTable.bookingId],
    references: [PaymentsTable.bookingId],
  }),
}));

export const paymentRelations = relations(PaymentsTable, ({ one }) => ({
  booking: one(BookingsTable, {
    fields: [PaymentsTable.bookingId],
    references: [BookingsTable.bookingId],
  }),
}));

export const ticketRelations = relations(SupportTicketsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [SupportTicketsTable.userId],
    references: [UsersTable.userId],
  }),
}));

// Infer types
export type TIUSer = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIHotel = typeof HotelsTable.$inferInsert;
export type TIBooking = typeof BookingsTable.$inferInsert
export type TSBooking = typeof BookingsTable.$inferSelect
export type TIHotels = typeof HotelsTable.$inferInsert
export type TSHotels = typeof HotelsTable.$inferSelect
export type TIPayments = typeof PaymentsTable.$inferInsert
export type TSPayments = typeof PaymentsTable.$inferSelect
export type TIRooms = typeof RoomsTable.$inferInsert
export type TSRooms = typeof RoomsTable.$inferSelect
export type TISupportTicket = typeof SupportTicketsTable.$inferInsert
export type TSSupportTicket = typeof SupportTicketsTable.$inferSelect
