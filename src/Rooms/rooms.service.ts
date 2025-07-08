import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIRooms, RoomsTable } from "../Drizzle/schema"


export const createRoomService = async(room:TIRooms) => {
    const [ inserted ] = await db.insert(RoomsTable).values(room).returning()
    if(inserted){
        return "Room was created successfully"
    }
    return null
}


export const getAllRoomsService = async() => {
    const rooms = await db.query.RoomsTable.findMany()
    return rooms
    
    
}

// get rooms by id
export const getRoomByIdService = async (id: number) => {
    const room = await db.query.RoomsTable.findFirst({
        where: eq(RoomsTable.roomId, id)
    })
    return room;
}
//get rooms by email


// update rooms by id
export const updateRoomService = async (id: number, room: TIRooms) => {
    await db.update(RoomsTable).set(room).where(eq(RoomsTable.roomId, id))
    return "Room updated successfully";
}

// delete rooms by id
export const deleteRoomService = async (id: number) => {
    await db.delete(RoomsTable).where(eq(RoomsTable.roomId, id))
    return "Room deleted successfully";
}