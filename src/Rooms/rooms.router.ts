import { Express } from 'express'
import { createRoomController, deleteRoomController, getAllRoomsController, getRoomByIdController, updateRoomController } from './rooms.controller'

export const room = (app: Express) => {


  //Create a room
    app.route("/room").post(
        async(req, res, next) => {
            try {
                await createRoomController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Get all rooms
    app.route("/rooms").get(
        async( req, res, next) => {
            try {
                await getAllRoomsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )


    //Get room by id
       app.route("/room/:id").get(
      
          async (req, res, next) => {
            try {
              await getRoomByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update room by ID
    
      app.route("/room/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateRoomController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete room by id
      
      app.route("/room/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteRoomController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );


}

export default room
    