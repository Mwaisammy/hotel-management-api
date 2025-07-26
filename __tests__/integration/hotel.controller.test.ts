import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import {
  UsersTable,
  HotelsTable,
} from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

describe("hotel Integration", () => {
  let userid: number;
  let hotelid: number;


  const testUser = {
    firstname: "mid",
    lastname: "user",
    email: "mild@example.com",
    password: "password456",
    contactPhone: "0700222333",
    address: "Mombasa, Kenya",
    role: "user" as "user",
    
  };

  const testHotel = {
         name: "Bevery Hills Hotel",
        location: "Nakuru",
        address: "Forest road",
        contactPhone: "0790333444",
        category: "5-star",
        rating: "3.8",
        
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



  

  });

  
  afterAll(async () => {
    if (hotelid)
    await db.delete(HotelsTable).where(eq(HotelsTable.hotelId, hotelid));
    await db.delete(UsersTable).where(eq(UsersTable.userId, userid));
    
  });

  it("should create a new hotel", async () => {
    const res = await request(app).post("/hotel").send({
     ...testHotel,
      userId: userid,
   
    });
    console.log(res.body)



    expect(res.statusCode).toBe(201)
     


    
  });

  it("should get all hotel", async () => {
    const response = await request(app).get("/hotels");
    expect(response.statusCode).toBe(200);
  });

  it("should get hotel by ID", async () => {
    const response = await request(app).get(`/hotel/${hotelid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should update a hotel", async () => {
    const response = await request(app)
      .put(`/hotel/${hotelid}`)
      .send({ category: "Luxury" });

    expect(response.statusCode).toBe(200);
  });

  it("should return 404 for non-existent hotel ID", async () => {
    const response = await request(app).get("/hotel/999999");
    expect(response.statusCode).toBe(404);
  });
// it("should fail to create with no fields", async () => {
//     const response = await request(app).post("/hotel").send({});

//     expect(response.statusCode).toBe(400);
  
    
// })


  it("should fail to update non-existing hotel", async () => {
    const response = await request(app)
      .patch("/hotel/invalid-id")
      .send({ category: "luxury" });

    expect(response.statusCode).toBe(404);
  });

  it("should delete the hotel", async () => {
    const response = await request(app).delete(`/hotel/${hotelid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 after deletion fails", async () => {
    const response = await request(app).get(`/hotel/${hotelid}`);
    expect(response.statusCode).toBe(404);
  });
});
