import { createUserService, userLoginService } from "./auth.service";
import { Request, Response } from "express";
import bycrypt from 'bcryptjs'

//create a user controller

export const createUserController = async(req: Request, res: Response) => {
    try {

        const user  = req.body;
        console.log(user)
        const password = user.password;
        const hashedPassword = bycrypt.hashSync(password, 10)
        user.password = hashedPassword 


        const createUser = await createUserService(user)
        if(!createUser) return res.json({message: "User not created"})
            return res.status(201).json({message: "User created successfully"})


        
    } catch (error: any) {
        return res.status(500).json({error: error.message})

    }
}


export const loginUserController = async(req: Request, res: Response) => {
    const user = req.body

    //check if user exist
    const userExist = await userLoginService(user)
    if(!userExist){
        return res.status(404).json({message: "User not found"})
    }

    //verify the password
    if (typeof user.password !== "string" || typeof userExist.password !== "string") {
        return res.status(400).json({message: "Invalid password format"});
    }
    const userMatch = bycrypt.compareSync(user.password, userExist.password);
    if(!userMatch){
        return res.status(401).json({message: "Invalid credentials"})

    }

    //create payload

    const payload = {
        sub: userExist.userId,
        user_id: userExist.userId,
        first_name: userExist.firstname,
        last_name: userExist.lastname,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 //token expires in one day

         
    }
     
}


