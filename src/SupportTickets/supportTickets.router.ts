import { Express } from 'express'

import { deleteSupportTicketController, getAllSupportTicketsController , updateSupportTicketController, getSupportTicketByIdController, createTicketController} from './supportTickets.controller'

export const ticket = (app: Express) => {


    //Create a ticket
    app.route("/ticket").post(
      async( req, res, next) => {

        try {
                  await createTicketController(req, res)

          
        } catch (error: any) {
          next(error)
          
        }
      }
    )

    //Get all tickets
    app.route("/tickets").get(
        async( req, res, next) => {
            try {
                await getAllSupportTicketsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )


    //Get ticket by id
       app.route("/ticket/:id").get(
      
          async (req, res, next) => {
            try {
              await getSupportTicketByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update support ticket by ID
    
      app.route("/ticket/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateSupportTicketController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete support ticket by id
      
      app.route("/ticket/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteSupportTicketController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );


}

export default ticket
    