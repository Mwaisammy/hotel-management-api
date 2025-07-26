import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import {
  UsersTable,
  HotelsTable,
  RoomsTable,
} from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

describe("Rooms Integration", () => {
  let userid: number;
  let hotelid: number;
  let roomid: number;



  const testUser = {
    firstname: "mid",
    lastname: "user",
    email: "miiie@example.com",
    password: "password456",
    contactPhone: "0700222333",
    address: "Mombasa, Kenya",
    role: "user" as "user",
   
  };

  const testHotel = {
    name: "Safari Camp",
    location: "Nairobi",
    address: "123 Safari St",
    contactPhone: "0790111222",
    category: "Luxury",
    rating: "4.5",
 
  };

  

  const testRoom = {
    roomType: "Standard Room",
    pricePerNight: "10000.00",
    capacity: 2,
    amenities: "WiFi, TV",
    isAvailable: true,
  
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
    
    hotelId: hotelid,

  }).returning();
  roomid = roomResponse[0].roomId
   console.log("rooom",roomResponse)

  })

  
  afterAll(async () => {
    if (userid) {
      await db.delete(UsersTable).where(eq(UsersTable.userId, userid));
    }
    if (hotelid) {
      await db.delete(HotelsTable).where(eq(HotelsTable.hotelId, hotelid));
    }
    if (roomid) {
      await db.delete(RoomsTable).where(eq(RoomsTable.roomId, roomid));
    }
  
    
    
  });

  it("should create a new room", async () => {
    const newRoom ={
      ...testRoom,
      hotelId: hotelid
    }
    const res = await request(app)
    .post("/room")
    .send(
      newRoom
     
            
           
    )
    .expect(201)
    
    
 
     


    
  });

  it("should get all rooms", async () => {
    const response = await request(app).get("/rooms");
    expect(response.statusCode).toBe(200);
  });

  it("should get room by ID", async () => {
    const response = await request(app).get(`/room/${roomid}`);
    expect(response.statusCode).toBe(200);
 
  });

  it("should update a room", async () => {
    const response = await request(app)
      .put(`/room/${roomid}`)
      .send({capacity: 4, });

    expect(response.statusCode).toBe(200);
  });

  it("should return 404 for non-existent room ID", async () => {
    const response = await request(app).get("/rooms/999999");
    expect(response.statusCode).toBe(404);
  });

  it("should fail to create room with missing fields", async () => {
    const response = await request(app).post("/room").send({});
    expect(response.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("should fail to update non-existing room", async () => {
    const response = await request(app)
      .patch("/rooms/999999")
      .send({ capacity: 3});

    expect(response.statusCode).toBe(404);
  });

  it("should delete the room", async () => {
    const response = await request(app).delete(`/room/${roomid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 after deletion fails", async () => {
    const response = await request(app).get(`/room/${roomid}`);
    expect(response.statusCode).toBe(404);
  });
});
