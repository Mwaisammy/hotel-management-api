//Routing

import { Express } from "express";
import { createUserController } from "./auth.controller";


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


}

export default auth
