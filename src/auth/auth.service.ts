import { sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIUSer, UsersTable } from "../Drizzle/schema"

//creating a user

export const createUserService = async (user: TIUSer) => {
    await db.insert(UsersTable).values(user)
    return "User created successfully"
}

//Login user

export const userLoginService = async(user: TIUSer) => {
    //email used to confirm existence of a user in the db
    const { email } = user

    return await db.query.UsersTable.findFirst({
        columns: {
            userId: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true
        }, where: sql`${UsersTable.email} = ${email}`
    })
    
}