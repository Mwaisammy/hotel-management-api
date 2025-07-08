import { Request, Response } from 'express';
import { createTicketService, deleteSupportTicketService, getAllSupportTicketsService, getSupportTicketByIdService, updateSupportTicketService } from "./supportTickets.service"
 

export const createTicketController = async(req: Request, res:Response) => {

  try {
    const ticket = req.body

    const createdTicket = await createTicketService(ticket)
    if(!createdTicket) return res.json({message: "Ticket not created"})
      return res.status(201).json({message: "Ticket was created successfully"})
    

    
  } catch (error: any) {
                return res.status(500).json({ error: error.message });

    
  }
}

export const getAllSupportTicketsController = async(req: Request, res:Response) => {
    try {
        const supportTickets = await getAllSupportTicketsService()
        if(!supportTickets) return res.json({message: "No SupportTickets found"})
        return res.status(200).json({message: supportTickets})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getSupportTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const supportTicket = await getSupportTicketByIdService(id);

    if (!supportTicket) return res.status(404).json({ message: "Support ticket not found" });


    return res.status(200).json( supportTicket);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const supportTicketData = req.body;

    const existingSupportTicket = await getSupportTicketByIdService(id);
    if (!existingSupportTicket) {
      return res.status(404).json({ message: "Support ticket not found" });
    }


    const updatedSupportTicket = await updateSupportTicketService(id, supportTicketData);
     if (!updatedSupportTicket) {
            return res.status(400).json({ message: "Support ticket not updated" });
        }
    return res.status(200).json({ message: "Support ticket updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingSupportTicket = await deleteSupportTicketService(id);
    if(!existingSupportTicket){
      return res.status(404).json({ message: "Support ticket not found" });
    }

    const deletedSupportTicket = await deleteSupportTicketService(id);

    if(!deletedSupportTicket){
      return res.status(400).json({ message: "Support ticket not deleted" })
    }


    return res.status(200).json({ message: "Support ticket deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}