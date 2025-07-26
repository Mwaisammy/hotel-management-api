import request from 'supertest'
import { UsersTable } from '../../src/Drizzle/schema'
import bcrypt from 'bcryptjs'
import db from '../../src/Drizzle/db'
import { eq } from 'drizzle-orm'
import app from '../../src/index'



let testUser = {
    firstname: "Test",
    lastname: "user",
    email: "test@mail.com", 
    password: 'hashed'
}

afterAll(async () => {
    await db.delete(UsersTable).where(eq(UsersTable.email, testUser.email))
    // await db.$client.end()
})


describe("POST /auth/register", () => {
    it("should register a new user successfully", async() => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            ...testUser,
            password: bcrypt.hashSync(testUser.password, 10)
        })


    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('message', 'User created successfully')

    })


    it("should fail when a user is registered more than once", async() => {
      //register a user 
       await request(app)
        .post("/auth/register")
        .send({
            ...testUser,
            password: bcrypt.hashSync(testUser.password, 10)
        })

        //try to register same user again

      const res = await request(app)
        .post("/auth/register")
        .send({
            ...testUser,
            password: bcrypt.hashSync(testUser.password, 10)
        })

        expect(res.statusCode).toBe(500)
        

    })

    it("should fail when a user is registered without a password", async() => {
        const res = await request(app)
        .post("/auth/register")
        .send({
            ...testUser,
            password: ""
        })

        expect(res.statusCode).toBe(500)
        
    })

    


})

