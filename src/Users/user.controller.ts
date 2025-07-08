import { Request, Response } from 'express';
import { deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "./user.service"
 

export const getAllUsersController = async(req: Request, res:Response) => {
    try {
        const users = await getAllUsersService()
        if(!users) return res.json({message: "No users found"})
        return res.status(200).json({message: users})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const User = await getUserByIdService(id);

    if (!User) return res.status(404).json({ message: "User not found" });


    return res.status(200).json( User);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const UserData = req.body;

    const exixtingUser = await getUserByIdService(id);
    if (!exixtingUser) {
      return res.status(404).json({ message: "User not found" });
    }


    const updatedUser = await updateUserService(id, UserData);
     if (!updatedUser) {
            return res.status(400).json({ message: "User not updated" });
        }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingUser = await deleteUserService(id);
    if(!existingUser){
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await deleteUserService(id);

    if(!deletedUser){
      return res.status(400).json({ message: "User not deleted" })
    }


    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}