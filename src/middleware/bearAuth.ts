import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'



//Middleware to check if the user is loggedin

export const checkRoles = (requiredRole: "admin" | "user" | "both") => {
    return (req: Request, res:Response, next:NextFunction): void => {

        const authHeader = req.headers.authorization
           
        if(!authHeader || !authHeader.startsWith("Bearer" ) ){
            res.status(401).json({message: "Unauthorized"})
            return;
        }
    
        const token = authHeader.split(" ")[1] //split the bearer token 
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
           (req as any).user = decoded;
            next();
    
            if(
                typeof decoded === 'object' && 
                decoded !==null &&
                "role" in decoded
            ){
                if (requiredRole === "both") //allowing both
                if(decoded.role === "admin" || decoded.role === "user"){
                    next();
                    return;
                } else if (decoded.role === requiredRole){
                    next();
                    return;
                }

                res.status(401).json({message: "Unauthorized" })
                return;
               
                 
                
            } else  {
               
                res.status(401).json({message: "Invalid token payload"})
            }

    
    
            
        } catch (error) {
            res.status(401).json({message: "Invalid token"})
            return  
            
        }
    }
}


export const adminRoleAuth = checkRoles("admin")
export const userRoleAuth = checkRoles("admin")
export const bothRoleAuth = checkRoles("admin")