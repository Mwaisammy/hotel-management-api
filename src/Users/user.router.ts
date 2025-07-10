import { Express } from 'express'
import { deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from './user.controller'

export const users = (app: Express) => {

    app.route("/users").get(

        async( req, res, next) => {
            try {
                await getAllUsersController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

       app.route("/user/:id").get(
      
          async (req, res, next) => {
            try {
              await getUserByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update customer by ID
    
      app.route("/user/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateUserController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete customer by id
      
      app.route("/user/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteUserController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );


}

export default users
    