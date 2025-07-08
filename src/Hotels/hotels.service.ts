import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIHotels,  HotelsTable } from "../Drizzle/schema"



export const createHotelService = async(hotels: TIHotels) => {
    const [inserted] = await db.insert(HotelsTable).values(hotels).returning()
    if(inserted) {
        return "Hotel was created"
    }
    return null
}



export const getAllHotelsService = async() => {
    const hotels = await db.query.HotelsTable.findMany()
    return hotels
    
    
}

// get Hotels by id
export const getHotelsByIdService = async (id: number) => {
    const hotels = await db.query.HotelsTable.findFirst({
        where: eq(HotelsTable.hotelId, id)
    })
    return hotels;
}
//get Hotels by email


// update Hotels by id
export const updateHotelservice = async (id: number, hotels: TIHotels) => {
    await db.update(HotelsTable).set(hotels).where(eq(HotelsTable.hotelId, id))
    return "Hotel updated successfully";
}

// delete Hotels by id
export const deleteHotelservice = async (id: number) => {
    await db.delete(HotelsTable).where(eq(HotelsTable.hotelId, id))
    return "Hotel deleted successfully";
}