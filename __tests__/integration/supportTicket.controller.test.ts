import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import {
  UsersTable,
  SupportTicketsTable,
} from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

let userid: number;
let ticketid: number;
describe("ticket Integration", () => {


  const testUser = {
    firstname: "mid",
    lastname: "user",
    email: "mild@example.com",
    password: "password456",
    contactPhone: "0700222333",
    address: "Mombasa, Kenya",
    role: "user" as "user",
    
  };

  const testTicket = {
            subject: "Early Check-in ",
            description: "Can I check in at 3pm instead of &&7pm?",
            status: "Open" as "Open"
  }

  beforeAll(async () => {
    const  hashedPassword = await bcrypt.hashSync(testUser.password,10)
    const createdUser = await db.insert(UsersTable).values({
      ...testUser,
      password: hashedPassword
    }).returning();
    userid = createdUser[0].userId

    const ticketResponse = await db.insert(SupportTicketsTable).values({
      ...testTicket,
      userId: userid
    }).returning();

    ticketid = ticketResponse[0].ticketId



  });


  
  afterAll(async () => {
    if (ticketid)
    await db.delete(SupportTicketsTable).where(eq(SupportTicketsTable.ticketId, ticketid));
    await db.delete(UsersTable).where(eq(UsersTable.userId, userid));
    
  });

  it("should create a new ticket", async () => {
    const res = await request(app).post("/ticket").send({
     ...testTicket,
      userId: userid,
   
    });
    console.log(res.body)



    expect(res.statusCode).toBe(201)
     


    
  });

  it("should get all ticket", async () => {
    const response = await request(app).get("/tickets");
    expect(response.statusCode).toBe(200);
  });

  it("should get ticket by ID", async () => {
    const response = await request(app).get(`/ticket/${ticketid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should update a ticket", async () => {
    const response = await request(app)
      .put(`/ticket/${ticketid}`)
      .send({ subject: "Early Check-in " });

    expect(response.statusCode).toBe(200);
  });

  it("should return 404 for non-existent ticket ID", async () => {
    const response = await request(app).get("/ticket/999999");
    expect(response.statusCode).toBe(404);
  });
// it("should fail to create with no fields", async () => {
//     const response = await request(app).post("/ticket").send({});

//     expect(response.statusCode).toBe(400);
  
    
// })


  it("should fail to update non-existing ticket", async () => {
    const response = await request(app)
      .patch("/ticket/invalid-id")
      .send({ subject: "Early Check-in "});

    expect(response.statusCode).toBe(404);
  });

  it("should delete the ticket", async () => {
    const response = await request(app).delete(`/ticket/${ticketid}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 after deletion fails", async () => {
    const response = await request(app).get(`/ticket/${ticketid}`);
    expect(response.statusCode).toBe(404);
  });
});
