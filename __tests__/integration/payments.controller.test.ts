import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import {
  UsersTable,
  BookingsTable,
  RoomsTable,
  PaymentsTable,
  HotelsTable,
} from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import hotel from "../../src/Hotels/hotels.router";



let userid: number;
let bookingid: number;
let roomid: number;
let paymentid: number;
let hotelid: number;


describe("payment Integration", () => {


  const testUser = {
    firstname: "mid",
    lastname: "user",
    email: "mild@example.com",
    password: "password456",
    contactPhone: "0700222333",
    address: "Mombasa, Kenya",
    role: "user" as "user",
    
  };

  const testBooking = {
    checkInDate: new Date("2025-07-10"),
    checkOutDate: new Date("2025-08-15"),
    totalAmount: "75000",
    bookingStatus: "Confirmed" as "Confirmed",
    
  };

  const testRoom = {
    roomType: "Standard Room",
    pricePerNight: "10000.00",
    capacity: 2,
    amenities: "WiFi, TV",
    isAvailable: true,

  }

   const testHotel = {
    name: "Safari Camp",
    location: "Nairobi",
    address: "123 Safari St",
    contactPhone: "0790111222",
    category: "Luxury",
    rating: "4.5",
    
  };

  const testPayment = {
            amount: "40000.00",
            paymentStatus: "Pending",
      paymentDate: new Date("2025-07-06"),
            paymentMethod: "M-pesa",
            transactionId: "TX555"

  }



  beforeAll(async () => {
    const  hashedPassword = await bcrypt.hashSync(testUser.password,10)
    const createdUser = await db.insert(UsersTable).values({
      ...testUser,
      password: hashedPassword
    }).returning();
    userid = createdUser[0].userId

    const hotelResponse = await db.insert(HotelsTable).values({
        ...testHotel
      }).returning();

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
      
    
    const paymentResponse = await db.insert(PaymentsTable).values({
        ...testPayment,
        paymentStatus: testPayment.paymentStatus as "Pending" | "Completed" | "Failed",
        paymentDate: new Date(testPayment.paymentDate),
        bookingId: bookingid,
    }).returning()
    paymentid = paymentResponse[0].paymentId

    })





  

  

  
  afterAll(async () => {
    if (paymentid)
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, paymentid));
    await db.delete(UsersTable).where(eq(UsersTable.userId, userid));
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingId, bookingid));
    
  });

  it("should create a new payment", async () => {
    const res = await request(app).post("/payment").send({
     ...testPayment,
     bookingId: bookingid,
   
    });
    console.log(res.body)



    expect(res.statusCode).toBe(201)
     


    
  });

  it("should get all payment", async () => {
    const response = await request(app).get("/payments");
    expect(response.statusCode).toBe(200);
  });

  it("should get payment by ID", async () => {
    const response = await request(app).get(`/payment/${paymentid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should update a payment", async () => {
    const response = await request(app)
      .put(`/payment/${paymentid}`)
      .send({  paymentStatus: "Completed"});

    expect(response.statusCode).toBe(200);
  });

  it("should return 404 for non-existent payment ID", async () => {
    const response = await request(app).get("/payment/999999");
    expect(response.statusCode).toBe(404);
  });
// it("should fail to create with no fields", async () => {
//     const response = await request(app).post("/payment").send({});

//     expect(response.statusCode).toBe(400);
  
    
// })


  it("should fail to update non-existing payment", async () => {
    const response = await request(app)
      .patch("/payment/invalid-id")
      .send({  paymentStatus: "Completed" });

    expect(response.statusCode).toBe(404);
  });

  it("should delete the payment", async () => {
    const response = await request(app).delete(`/payment/${paymentid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 after deletion fails", async () => {
    const response = await request(app).get(`/payment/${paymentid}`);
    expect(response.statusCode).toBe(404);
  });
});
