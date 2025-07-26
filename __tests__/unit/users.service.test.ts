import db from "../../src/Drizzle/db"
import {  deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../../src/Users/user.service"
import {  UsersTable,  } from "../../src/Drizzle/schema"

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        UsersTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
    
        }
    }
}))


beforeEach(() => {
    jest.clearAllMocks()
})

describe("User service", () =>{
   
    
    
    describe("get user service", () => {
          it("should get all users", async() => {
            const users = [
                {
                    userId: 1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john@example.com",
                    password: "password123",
                    contactPhone: "0700111222",
                    address: "Nairobi, Kenya",
                },
                {
                    userId: 1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john@example.com",
                    password: "password123",
                    contactPhone: "0700111222",
                    address: "Nairobi, Kenya",
                }
            ];
    
            (db.query.UsersTable.findMany as jest.Mock).mockResolvedValue(users)
    
            const result = await getAllUsersService()
            expect(result).toEqual(users)
            expect(db.query.UsersTable.findMany).toHaveBeenCalled()
          })
          it("should return an empty array if no Users are found", async () => {
            (db.query.UsersTable.findMany as jest.Mock).mockResolvedValue([])

            const result = await getAllUsersService()
            expect(result).toEqual([])
            expect(db.query.UsersTable.findMany).toHaveBeenCalled()
          })


            
        
    })


    describe("getTodoByIdService", () => {
        it("should get a user by id", async () => {
            const user = {
                     userId: 1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john@example.com",
                    password: "password123",
                    contactPhone: "0700111222",
                    address: "Nairobi, Kenya",
            };

            (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValue(user)

            const result = await getUserByIdService(1)
            expect(result).toEqual(user)
            expect(db.query.UsersTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        })

        it("should return null if no User is found", async () => {
            (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await getUserByIdService(999)
            expect(result).toBeNull()
            expect(db.query.UsersTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        
    })

  })


describe("Update User service", () => {
   it("should update a User by id", async () => {

    const whereMock = jest.fn().mockResolvedValue(undefined);
    const setMock = jest.fn().mockReturnValue({ where: whereMock });
    (db.update as jest.Mock).mockReturnValue({ set: setMock });

    const result = await updateUserService(1, {
                    userId: 1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john@example.com",
                    password: "password123",
                    contactPhone: "0700111222",
                    address: "Nairobi, Kenya",
    });

    expect(result).toEqual("User updated successfully");
    expect(db.update).toHaveBeenCalledWith(UsersTable);
    expect(setMock).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
   })
    
  })

  describe("Delete User service", () => {
    it("should delete a User by id", async () => {
    const whereMock = jest.fn().mockResolvedValue(undefined);
    const deleteMock = jest.fn().mockReturnValue({ where: whereMock });

    (db.delete as jest.Mock) = deleteMock;

    const result = await deleteUserService(1);

    expect(result).toEqual("User deleted successfully");
    expect(deleteMock).toHaveBeenCalledWith(UsersTable);
    expect(whereMock).toHaveBeenCalled();
});

  })



})