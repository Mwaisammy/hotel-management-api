import { Request, Response } from 'express';
import { createRoomService, deleteRoomService, getAllRoomsService, getRoomByIdService, updateRoomService } from "./rooms.service"
 


export const createRoomController = async(req: Request, res:Response) => {
  try {
    const room = req.body
    const createdRoom = await createRoomService(room)
    if(!createdRoom) return res.json({message: "Room not created"})
      res.status(201).json({message : "Room was created successfully"})

  
    
  } catch (error: any) {
        return res.status(500).json({ error: error.message });

    
  } 
}

export const getAllRoomsController = async(req: Request, res:Response) => {
    try {
        const rooms = await getAllRoomsService()
        if(!rooms) return res.json({message: "No Room found"})
        return res.status(200).json({message: rooms})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getRoomByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const room = await getRoomByIdService(id);

    if (!room) return res.status(404).json({ message: "Room not found" });


    return res.status(200).json( room );

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateRoomController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const roomData = req.body;

    const existingRoom = await getRoomByIdService(id);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }


    const updatedRoom = await updateRoomService(id, roomData);
     if (!updatedRoom) {
            return res.status(400).json({ message: "Room not updated" });
        }
    return res.status(200).json({ message: "Room updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteRoomController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingRoom = await deleteRoomService(id);
    if(!existingRoom){
      return res.status(404).json({ message: "Room not found" });
    }

    const deletedRoom = await deleteRoomService(id);

    if(!deletedRoom){
      return res.status(400).json({ message: "Room not deleted" })
    }


    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}