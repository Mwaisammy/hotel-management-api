import { Express } from 'express'
import { createHotelController, deleteHotelController, getAllHotelsController, getHotelByIdController, updateHotelController } from './hotels.controller'

export const hotel = (app: Express) => {

  //create a hotel
  app.route("/hotel").post(
    async( req, res, next) => {
      try {
        await createHotelController(req, res)
      } catch (error) {
        next(error)
        
      }
    }
  )

    //Get all hotels
    app.route("/hotels").get(
        async( req, res, next) => {
            try {
                await getAllHotelsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )


    //Get hotel by id
       app.route("/hotel/:id").get(
      
          async (req, res, next) => {
            try {
              await getHotelByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update customer by ID
    
      app.route("/hotel/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateHotelController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete customer by id
      
      app.route("/hotel/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteHotelController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );


}

export default hotel
    