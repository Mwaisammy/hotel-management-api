import { Request, Response } from 'express';
import { createPaymentService, deletePaymentService, getAllPaymentsService, getPaymentByIdService, updatePaymentService } from "./payments.service"
 


export const createPaymentController = async(req: Request, res:Response) => {

  try {

    const payment = req.body

    //convert date to date object
    if(payment.paymentDate ){
      payment.paymentDate = new Date(payment.paymentDate)
      

    }
    const createdpayment = await createPaymentService(payment)
    if(!createdpayment) return res.json({message: "Payment not created"})
    return res.status(201).json({message:createdpayment})
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}

export const getAllPaymentsController = async(req: Request, res:Response) => {
    try {
        const payment = await getAllPaymentsService()
        if(!payment) return res.json({message: "No Payment found"})
        return res.status(200).json({message: payment})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const payment = await getPaymentByIdService(id);

    if (!payment) return res.status(404).json({ message: "payment not found" });


    return res.status(200).json( payment);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updatePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

      const paymentData = req.body

    //convert date to date object
    if(paymentData.paymentDate ){
      paymentData.paymentDate = new Date(paymentData.paymentDate)
      

    }

    const existingPayment = await getPaymentByIdService(id);
    if (!existingPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }


    const updatedpayment = await updatePaymentService(id, paymentData);
     if (!updatedpayment) {
            return res.status(400).json({ message: "Payment not updated" });
        }
    return res.status(200).json({ message: "Payment updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingpayment = await deletePaymentService(id);
    if(!existingpayment){
      return res.status(404).json({ message: "payment not found" });
    }

    const deletedpayment = await deletePaymentService(id);

    if(!deletedpayment){
      return res.status(400).json({ message: "Payment not deleted" })
    }


    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}