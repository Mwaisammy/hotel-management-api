import { Request, Response } from 'express';
import { createHotelService, deleteHotelservice, getAllHotelsService, getHotelsByIdService, updateHotelservice } from "./hotels.service"


export const createHotelController = async (req: Request, res: Response) => {
  const hotel = req.body;

  // Validate required fields
  // if (!hotel.name || !hotel.location || !hotel.price) {
  //   return res.status(400).json({ message: "Missing required hotel fields" });
  // }

  if(!hotel) {
    return res.status(400).json({message: "Hotel not created"})
  }

  

  const createdHotel = await createHotelService(hotel);
  // missing fields
  if (createdHotel === null) {
    return res.status(400).json({ message: "Missing required hotel fields" });
  }
  

  if (!createdHotel) {
    return res.status(400).json({ message: "Hotel not created" });
  }

  return res.status(201).json({ message: createdHotel });
};

 

export const getAllHotelsController = async(req: Request, res:Response) => {
    try {
        const hotels = await getAllHotelsService()
        if(!hotels) return res.json({message: "No Hotelss found"})
        return res.status(200).json({message: hotels})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getHotelByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const hotel = await getHotelsByIdService(id);

    if (!hotel) return res.status(404).json({ message: "Hotels not found" });


    return res.status(200).json( hotel );

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateHotelController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const hotelData = req.body;

    const existingHotel = await getHotelsByIdService(id);
    if (!existingHotel) {
      return res.status(404).json({ message: "Hotels not found" });
    }


    const updatedHotel = await updateHotelservice(id, hotelData);
     if (!updatedHotel) {                                     
            return res.status(400).json({ message: "Hotels not updated" });
        }
    return res.status(200).json({ message: "Hotels updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteHotelController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingHotel = await deleteHotelservice(id);
    if(!existingHotel){
      return res.status(404).json({ message: "Hotels not found" });
    }

    const deletedHotel = await deleteHotelservice(id);

    if(!deletedHotel){
      return res.status(400).json({ message: "Hotels not deleted" })
    }


    return res.status(200).json({ message: "Hotels deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}