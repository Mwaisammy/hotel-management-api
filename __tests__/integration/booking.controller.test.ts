import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import {
  UsersTable,
  HotelsTable,
  RoomsTable,
  BookingsTable,
} from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

describe("Bookings Integration", () => {
  let userid: number;
  let hotelid: number;
  let roomid: number;
  let bookingid: number;

  const now = new Date().toISOString();

  const testUser = {
    firstname: "mid",
    lastname: "user",
    email: "mild@example.com",
    password: "password456",
    contactPhone: "0700222333",
    address: "Mombasa, Kenya",
    role: "user" as "user",
    createdAt: new Date(now),
    updatedAt: new Date(now)
  };

  const testHotel = {
    name: "Safari Camp",
    location: "Nairobi",
    address: "123 Safari St",
    contactPhone: "0790111222",
    category: "Luxury",
    rating: "4.5",
    createdAt: new Date(now),
    updatedAt: new Date(now)
  };

  const testRoom = {
    roomType: "Deluxe Suite",
    pricePerNight: "15000",
    capacity: 2,
    amenities: "WiFi, AC, TV, Mini Bar",
    isAvailable: true,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  };

  const testBooking = {
    checkInDate: new Date("2025-07-10"),
    checkOutDate: new Date("2025-08-15"),
    totalAmount: "75000",
    bookingStatus: "Confirmed" as "Confirmed",
    createdAt: new Date(now),
    updatedAt: new Date(now)
  };

  beforeAll(async () => {
    const  hashedPassword = await bcrypt.hashSync(testUser.password,10)
    const createdUser = await db.insert(UsersTable).values({
      ...testUser,
      password: hashedPassword
    }).returning();
    userid = createdUser[0].userId

    const hotelResponse = await db.insert(HotelsTable).values({
    ...testHotel
  }).returning()
  hotelid = hotelResponse[0].hotelId

  const roomResponse = await db.insert(RoomsTable).values({
    ...testRoom,
    hotelId: hotelid
  }).returning();
  roomid = roomResponse[0].roomId

  const bookingResponse = await db.insert(BookingsTable).values({
    ...testBooking,
    userId: userid,
    roomId: roomid
  }).returning();
  bookingid = bookingResponse[0].bookingId

  });

  
  afterAll(async () => {
    if (bookingid)
      await db.delete(BookingsTable).where(eq(BookingsTable.bookingId, bookingid));
    await db.delete(RoomsTable).where(eq(RoomsTable.roomId, roomid));
    await db.delete(HotelsTable).where(eq(HotelsTable.hotelId, hotelid));
    await db.delete(UsersTable).where(eq(UsersTable.userId, userid));
    
  });

  it("should create a new booking", async () => {
    const res = await request(app).post("/booking").send({
     
      userId: userid,
      roomId: roomid,
      checkInDate: "2025-07-10",
    checkOutDate: "2025-07-15",
    totalAmount: "75000",
    bookingStatus: "Confirmed",
    createdAt: new Date(now),
    updatedAt: new Date(now)
    });



    expect(res.statusCode).toBe(201)
     


    
  });

  it("should get all bookings", async () => {
    const response = await request(app).get("/bookings");
    expect(response.statusCode).toBe(200);
  });

  it("should get booking by ID", async () => {
    const response = await request(app).get(`/booking/${bookingid}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.bookingId).toBe(bookingid);
  });

  it("should update a booking", async () => {
    const response = await request(app)
      .put(`/booking/${bookingid}`)
      .send({ totalAmount: "50000" });

    expect(response.statusCode).toBe(200);
  });

  it("should return 404 for non-existent booking ID", async () => {
    const response = await request(app).get("/bookings/999999");
    expect(response.statusCode).toBe(404);
  });

  it("should fail to create booking with missing fields", async () => {
    const response = await request(app).post("/booking").send({});
    expect(response.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("should fail to update non-existing booking", async () => {
    const response = await request(app)
      .patch("/bookings/999999")
      .send({ totalAmount: "50000" });

    expect(response.statusCode).toBe(404);
  });

  it("should delete the booking", async () => {
    const response = await request(app).delete(`/booking/${bookingid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 after deletion fails", async () => {
    const response = await request(app).get(`/booking/${bookingid}`);
    expect(response.statusCode).toBe(404);
  });
});
