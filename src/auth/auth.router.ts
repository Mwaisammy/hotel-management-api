//Routing
import { Express } from "express";
import { createUserController, loginUserController } from "./auth.controller";


const auth = (app:Express) => {
    //route
    app.route("/auth/register").post(
        async( req, res, next ) => {
            try {
                await createUserController(req, res)
                
            } catch (error) {
                next(error)
                
            }
        }
    )

    app.route("/auth/login").post(
        async(req, res, next) => {
            try {
                await loginUserController(req, res)
                
            } catch (error) {
               next(error) 
            }
        }
    )


}

export default auth
