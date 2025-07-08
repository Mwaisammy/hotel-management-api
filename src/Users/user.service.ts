import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIUSer, UsersTable } from "../Drizzle/schema"






export const getAllUsersService = async() => {
    const users = await db.query.UsersTable.findMany()
    return users
    
    
}

// get User by id
export const getUserByIdService = async (id: number) => {
    const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.userId, id)
    })
    return user;
}
//get User by email
export const getUserByEmailService = async (email: string) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.email} = ${email}`
    });
}; 

// update User by id
export const updateUserService = async (id: number, user: TIUSer) => {
    await db.update(UsersTable).set(user).where(eq(UsersTable.userId, id))
    return "User updated successfully";
}

// delete User by id
export const deleteUserService = async (id: number) => {
    await db.delete(UsersTable).where(eq(UsersTable.userId, id))
    return "User deleted successfully";
}