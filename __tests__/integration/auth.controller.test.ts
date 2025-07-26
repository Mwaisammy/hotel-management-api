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


beforeAll(async() => {
    //clean up
    const hashedPassword = bcrypt.hashSync(testUser.password, 10)
    await db.insert(UsersTable).values({
        ...testUser,
        password: hashedPassword
    })

})

afterAll(async() => {
    await db.delete(UsersTable).where(eq(UsersTable.email, testUser.email))
    // await db.$client.end()
})


describe('POST /auth/login', () => {
    it('should login user', async() => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: testUser.email,
            password: testUser.password
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('token')
    })

    it('should return 404 if user not found', async() => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: testUser.email,
            password: 'invalid-password'
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message', 'Invalid credentials')
    })
   it("should fail with non-existent user", async() => {
        const res =await request(app)
        .post("/auth/login")
        .send({
            email: 'nouser@email.com',
            password: 'testpass123'
        })

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({message: "User not found"})
    })

})