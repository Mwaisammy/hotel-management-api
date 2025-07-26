import { Request, Response } from 'express';
import { createBookingService, deleteBookingService, getAllBookingsService, getBookingByIdService, updateBookingService } from "./booking.service"
 
export const createBookingController = async(req: Request, res:Response) => {

  try {

    const booking = req.body

    //convert date to date object
    if(booking.checkInDate || booking.checkOutDate || booking.createdAt || booking.updatedAt ){
      booking.checkInDate = new Date(booking.checkInDate)
      booking.checkOutDate = new Date(booking.checkOutDate)
      booking.createdAt = new Date(booking.createdAt)
      booking.updatedAt = new Date(booking.updatedAt)
    }
    const createdBooking = await createBookingService(booking)
    if(!createdBooking) return res.json({message: "Booking not created"})
    return res.status(201).json({message:createdBooking})
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllBookingsController = async(req: Request, res:Response) => {
    try {
        const Bookings = await getAllBookingsService()
        if(!Bookings) return res.json({message: "No Bookings found"})
        return res.status(200).json({message:"bookings fetched succesfully",Bookings})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const booking = await getBookingByIdService(id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });


    return res.status(200).json( booking);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const bookingData = req.body;
    //convert date to date object
    if(bookingData.checkInDate || bookingData.checkOutDate || bookingData.createdAt || bookingData.updatedAt ){
      bookingData.checkInDate = new Date(bookingData.checkInDate)
      bookingData.checkOutDate = new Date(bookingData.checkOutDate)
      bookingData.createdAt = new Date(bookingData.createdAt)
      bookingData.updatedAt = new Date(bookingData.updatedAt)
    }


    const existingBooking = await getBookingByIdService(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }


    const updatedBooking = await updateBookingService(id, bookingData);
     if (!updatedBooking) {
            return res.status(400).json({ message: "Booking not updated" });
        }
    return res.status(200).json({ message: "Booking updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingBooking = await deleteBookingService(id);
    if(!existingBooking){
      return res.status(404).json({ message: "Booking not found" });
    }

    const deletedBooking = await deleteBookingService(id);

    if(!deletedBooking){
      return res.status(400).json({ message: "Booking not deleted" })
    }


    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}