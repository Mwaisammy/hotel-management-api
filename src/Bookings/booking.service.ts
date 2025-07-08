import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIBooking, BookingsTable } from "../Drizzle/schema"


export const createBookingService = async(bookings: TIBooking) => {
    const [ inserted ] = await db.insert(BookingsTable).values(bookings).returning()
    if(inserted){
        return "Bookings created successfully"
    }

    return null
}



export const getAllBookingsService = async() => {
    const bookings = await db.query.BookingsTable.findMany()
    return bookings
    
    
}

// get Booking by id
export const getBookingByIdService = async (id: number) => {
    const booking = await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingId, id)
    })
    return booking;
}


// update Booking by id
export const updateBookingService = async (id: number, booking: TIBooking) => {
    await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingId, id))
    return "Booking updated successfully";
}

// delete Booking by id
export const deleteBookingService = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingId, id))
    return "Booking deleted successfully";
}