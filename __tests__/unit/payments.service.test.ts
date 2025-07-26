import db from "../../src/Drizzle/db"
import { createPaymentService, deletePaymentService, getAllPaymentsService, getPaymentByIdService, updatePaymentService } from "../../src/Payments/payments.service"
import {  PaymentsTable,  } from "../../src/Drizzle/schema"

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        PaymentsTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
    
        }
    }
}))


beforeEach(() => {
    jest.clearAllMocks()
})

describe("Payment service", () =>{
    describe("Create Payment service", () => {
        it("should insert a Payment and return the inserted Payment", async () => {
            const payment = {
            paymentId: 1,
            bookingId: 1,
            amount: "75000.00",
            paymentStatus: "Completed" as "Completed",
            paymentDate: new Date("2025-07-06"),
            paymentMethod: "MPESA",
            transactionId: "TX111"
    
            };
            const inserted = { id: 1, ...payment };
            //chaining - checking behaviour of the db
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValue([inserted])
                })
    
            });
    
            const result = await createPaymentService(payment)
            expect(db.insert).toHaveBeenCalledWith(PaymentsTable)
            expect(result).toEqual("Payment created successfully")
    
        })
    
        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockReturnValueOnce([null])
                })
            })
    
    
            const payment = {
                    paymentId: 1,
            bookingId: 1,
            amount: "75000.00",
            paymentStatus: "Completed" as "Completed",
            paymentDate: new Date("2025-07-06"),
            paymentMethod: "MPESA",
            transactionId: "TX111"
    
            }
    
            const result = await createPaymentService(payment)
            expect(result).toBeNull()
        })
    
      
    
    })
    
    
    describe("get Payment service", () => {
          it("should get all Payments", async() => {
            const payments = [
                {
                    paymentId:1,
                    bookingId: 1,
                    amount: "75000",
                    paymentStatus: "Completed",
                    paymentMethod: "MPESA",
                    transactionId: "TX111"
                },
                {
                    paymentId: 2,
                    bookingId: 2,
                    amount: "40000",
                    paymentStatus: "Pending",
                    paymentMethod: "Card",
                    transactionId: "TX222"
                }
            ];
    
            (db.query.PaymentsTable.findMany as jest.Mock).mockResolvedValue(payments)
    
            const result = await getAllPaymentsService()
            expect(result).toEqual(payments)
            expect(db.query.PaymentsTable.findMany).toHaveBeenCalled()
          })
          it("should return an empty array if no Payments are found", async () => {
            (db.query.PaymentsTable.findMany as jest.Mock).mockResolvedValue([])

            const result = await getAllPaymentsService()
            expect(result).toEqual([])
            expect(db.query.PaymentsTable.findMany).toHaveBeenCalled()
          })


            
        
    })


    describe("getTodoByIdService", () => {
        it("should get a Payment by id", async () => {
            const Payment = {
                    paymentId:1,
                    bookingId: 1,
                    amount: "75000",
                    paymentStatus: "Completed",
                    paymentMethod: "MPESA",
                    transactionId: "TX111"
            };

            (db.query.PaymentsTable.findFirst as jest.Mock).mockResolvedValue(Payment)

            const result = await getPaymentByIdService(1)
            expect(result).toEqual(Payment)
            expect(db.query.PaymentsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        })

        it("should return null if no Payment is found", async () => {
            (db.query.PaymentsTable.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await getPaymentByIdService(999)
            expect(result).toBeNull()
            expect(db.query.PaymentsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        
    })

  })


describe("Update Payment service", () => {
   it("should update a Payment by id", async () => {

    const whereMock = jest.fn().mockResolvedValue(undefined);
    const setMock = jest.fn().mockReturnValue({ where: whereMock });
    (db.update as jest.Mock).mockReturnValue({ set: setMock });

    const result = await updatePaymentService(1, {
                    paymentId:1,
                    bookingId: 1,
                    amount: "75000",
                    paymentStatus: "Completed",
                    paymentMethod: "MPESA",
                    transactionId: "TX111"
    });

    expect(result).toEqual("Payment updated successfully");
    expect(db.update).toHaveBeenCalledWith(PaymentsTable);
    expect(setMock).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
   })
    
  })

  describe("Delete Payment service", () => {
    it("should delete a Payment by id", async () => {
    const whereMock = jest.fn().mockResolvedValue(undefined);
    const deleteMock = jest.fn().mockReturnValue({ where: whereMock });

    (db.delete as jest.Mock) = deleteMock;

    const result = await deletePaymentService(1);

    expect(result).toEqual("Payment deleted successfully");
    expect(deleteMock).toHaveBeenCalledWith(PaymentsTable);
    expect(whereMock).toHaveBeenCalled();
});

  })



})