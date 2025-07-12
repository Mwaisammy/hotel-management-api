import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TSSupportTicket, SupportTicketsTable, TISupportTicket } from "../Drizzle/schema"




export const createTicketService = async(ticket: TISupportTicket) => {
    const [inserted] = await db.insert(SupportTicketsTable).values(ticket).
    returning()
    if(inserted){
        return "Support ticket created successfully"
    }
    return null
}

export const getAllSupportTicketsService = async() => {
    const supportTicket = await db.query.SupportTicketsTable.findMany()
    return supportTicket
    
    
}

// get SupportTicket by id
export const getSupportTicketByIdService = async (id: number) => {
    const supportTicket = await db.query.SupportTicketsTable.findFirst({
        where: eq(SupportTicketsTable.ticketId, id)
    })
    return supportTicket;
}
//get SupportTicket by email


// update SupportTicket by id
export const updateSupportTicketService = async (id: number, supportTicket: TSSupportTicket) => {
    await db.update(SupportTicketsTable).set(supportTicket).where(eq(SupportTicketsTable.ticketId, id))
    return "Support ticket updated successfully";
}

// delete SupportTicket by id
export const deleteSupportTicketService = async (id: number) => {
    await db.delete(SupportTicketsTable).where(eq(SupportTicketsTable.ticketId, id))
    return "Support ticket deleted successfully";
}