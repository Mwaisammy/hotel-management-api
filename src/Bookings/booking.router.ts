import { Express } from 'express'
import { createBookingController, deleteBookingController, getAllBookingsController, getBookingByIdController, updateBookingController } from './booking.controller'

export const booking = (app: Express) => {

    //Get all bookings
    app.route("/bookings").get(
        async( req, res, next) => {
            try {
                await getAllBookingsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a booking
    app.route("/booking").post(
      async(req, res , next) => {
        try {
          await createBookingController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get booking by id
       app.route("/booking/:id").get(
      
          async (req, res, next) => {
            try {
              await getBookingByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update booking by ID
    
      app.route("/booking/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateBookingController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete booking by id
      
      app.route("/booking/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteBookingController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );


}

export default booking
    