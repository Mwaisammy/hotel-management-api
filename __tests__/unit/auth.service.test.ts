

import { createUserService, userLoginService } from "../../src/auth/auth.service";
import db from "../../src/Drizzle/db";
import { TIUSer } from "../../src/Drizzle/schema";
jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(() => ({
        values:jest.fn().mockReturnThis()

    })),
    query: {
        UsersTable: {
            findFirst: jest.fn()
        }
    }
}))

describe("Auth Service", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })


    describe("create user service", () => {
        it('should insert a user and return success message', async () => {
            const user = {
                firstname: "Test",
                lastname: "user",
                email: "test@mail.com",
                password: 'hashed'
    
                
            }
            const result = await createUserService(user)
            expect(db.insert).toHaveBeenCalled()
            expect(result).toBe("User created successfully")
        })
    
    })

    describe("userLoginService", () => {
        it("should login a user", async() => {
           const mockUser = {
                firstname: "mock",
                lastname: "user",
                email: "mock@gmail.com",
                password: 'hashed'
    
                
            };
            //check user in the db
            (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValueOnce(mockUser)

            const result = await userLoginService({email: 'mock@gmail.com'} as TIUSer)
            expect(db.query.UsersTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(mockUser)

        })

        it('should return null if user not found', async() => {
            (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValueOnce(null)

            const result = await userLoginService({email: 'notfound@gmail.com'} as TIUSer)
            expect(db.query.UsersTable.findFirst).toHaveBeenCalled()
            expect(result).toBeNull()
        })
    })

})

