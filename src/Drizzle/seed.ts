/*istanbul ignore next*/

import db from "./db";
import {
  UsersTable,
  HotelsTable,
  RoomsTable,
  BookingsTable,
  PaymentsTable,
  SupportTicketsTable,
} from "../Drizzle/schema";


async function seedDatabase() {
  try {
    console.log("Seeding started...");

    // USERS
    await db.insert(UsersTable).values([
      {
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: "password123",
        contactPhone: "0700111222",
        address: "Nairobi, Kenya",
        role: "user"
      },
      {
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        password: "password456",
        contactPhone: "0700222333",
        address: "Mombasa, Kenya",
        role: "user"
      },
      {
        firstname: "Michael",
        lastname: "Brown",
        email: "mike@example.com",
        password: "password789",
        contactPhone: "0700333444",
        address: "Kisumu, Kenya",
        role: "user"
      },
      {
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        password: "adminpass",
        contactPhone: "0700444555",
        address: "Admin HQ",
        role: "admin"
      },
      {
        firstname: "Sarah",
        lastname: "Connor",
        email: "sarah@example.com",
        password: "terminator",
        contactPhone: "0700555666",
        address: "Eldoret, Kenya",
        role: "user"
      }
    ]);

    // HOTELS
    await db.insert(HotelsTable).values([
      {
        name: "Safari Lodge",
        location: "Nairobi",
        address: "123 Safari St",
        contactPhone: "0790111222",
        category: "Luxury",
        rating: "4.5"
      },
      {
        name: "Seaview Resort",
        location: "Mombasa",
        address: "Beach Road",
        contactPhone: "0790222333",
        category: "Resort",
        rating: "4.0"
      },
      {
        name: "Green Hills Hotel",
        location: "Nyeri",
        address: "Forest Lane",
        contactPhone: "0790333444",
        category: "Budget",
        rating: "3.8"
      },
      {
        name: "Lake View Retreat",
        location: "Naivasha",
        address: "Lake Road",
        contactPhone: "0790444555",
        category: "Nature",
        rating: "4.3"
      },
      {
        name: "Urban Stay",
        location: "Kisumu",
        address: "City Center",
        contactPhone: "0790555666",
        category: "Business",
        rating: "4.1"
      }
    ]);

    // RoomsTable
    await db.insert(RoomsTable).values([
      {
        hotelId: 1,
        roomType: "Deluxe Suite",
        pricePerNight: "15000",
        capacity: 2,
        amenities: "WiFi, AC, TV, Mini Bar",
        isAvailable: true
      },
      {
        hotelId: 1,
        roomType: "Standard Room",
        pricePerNight: "10000",
        capacity: 2,
        amenities: "WiFi, TV",
        isAvailable: true
      },
      {
        hotelId: 2,
        roomType: "Beachfront Room",
        pricePerNight: "18000",
        capacity: 3,
        amenities: "WiFi, Sea View, AC",
        isAvailable: true
      },
      {
        hotelId: 3,
        roomType: "Budget Twin",
        pricePerNight: "5000",
        capacity: 2,
        amenities: "Fan, Shared Bathroom",
        isAvailable: true
      },
      {
        hotelId: 4,
        roomType: "Nature Cabin",
        pricePerNight: "12000",
        capacity: 4,
        amenities: "Balcony, Fireplace, WiFi",
        isAvailable: true
      }
    ]);

    // BookingsTable
       await db.insert(BookingsTable).values([
      {
        userId: 1,
        roomId: 1,
        checkInDate: new Date("2025-07-10"),
        checkOutDate: new Date("2025-07-15"),
        totalAmount: "75000",
        bookingStatus: "Confirmed"
      },
      {
        userId: 2,
        roomId: 2,
        checkInDate: new Date("2025-08-01"),
        checkOutDate: new Date("2025-08-05"),
        totalAmount: "40000",
        bookingStatus: "Pending"
      },
      {
        userId: 3,
        roomId: 3,
        checkInDate: new Date("2025-09-10"),
        checkOutDate: new Date("2025-09-15"),
        totalAmount: "90000",
        bookingStatus: "Confirmed"
      },
      {
        userId: 4,
        roomId: 4,
        checkInDate: new Date("2025-07-20"),
        checkOutDate: new Date("2025-07-25"),
        totalAmount: "25000",
        bookingStatus: "Cancelled"
      },
      {
        userId: 5,
        roomId: 5,
        checkInDate: new Date("2025-07-28"),
        checkOutDate: new Date("2025-07-31"),
        totalAmount: "36000",
        bookingStatus: "Confirmed"
      }
    ]);

    // PAYMENTS
    await db.insert(PaymentsTable).values([
      {
        bookingId: 1,
        amount: "75000",
        paymentStatus: "Completed",
        paymentMethod: "MPESA",
        transactionId: "TX111"
      },
      {
        bookingId: 2,
        amount: "40000",
        paymentStatus: "Pending",
        paymentMethod: "Card",
        transactionId: "TX222"
      },
      {
        bookingId: 3,
        amount: "90000",
        paymentStatus: "Completed",
        paymentMethod: "Bank Transfer",
        transactionId: "TX333"
      },
      {
        bookingId: 4,
        amount: "25000",
        paymentStatus: "Failed",
        paymentMethod: "Card",
        transactionId: "TX444"
      },
      {
        bookingId: 5,
        amount: "36000",
        paymentStatus: "Completed",
        paymentMethod: "MPESA",
        transactionId: "TX555"
      }
    ]);

    // SUPPORT TICKETS
    await db.insert(SupportTicketsTable).values([
      {
        userId: 1,
        subject: "Early Check-in Request",
        description: "Can I check in at 10am instead of 2pm?",
        status: "Open"
      },
      {
        userId: 2,
        subject: "WiFi Issue",
        description: "WiFi keeps disconnecting in my room.",
        status: "In Progress"
      },
      {
        userId: 3,
        subject: "Payment Failed",
        description: "Payment didn't go through but money was deducted.",
        status: "Resolved"
      },
      {
        userId: 4,
        subject: "Booking Cancellation",
        description: "I need to cancel my booking due to an emergency.",
        status: "Closed"
      },
      {
        userId: 5,
        subject: "Room Amenities Missing",
        description: "The mini bar listed in the room was not available.",
        status: "Open"
      }
    ]);

    console.log("🌱 Seeding complete!");

     } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seedDatabase();

