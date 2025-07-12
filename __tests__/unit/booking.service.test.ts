import db from "../../src/Drizzle/db"
import { createBookingService, deleteBookingService, getAllBookingsService, getBookingByIdService, updateBookingService } from "../../src/Bookings/booking.service"
import { BookingsTable } from "../../src/Drizzle/schema"

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        BookingsTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
    
        }
    }
}))


beforeEach(() => {
    jest.clearAllMocks()
})

describe("Booking service", () =>{
    describe("Create booking service", () => {
        it("should insert a booking and return the inserted booking", async () => {
            const booking = {
                userId: 1,
                roomId: 2,
                checkInDate: new Date(),
                checkOutDate: new Date(),
                totalAmount: "45,000"
    
            };
            const inserted = { id: 1, ...booking };
            //chaining - checking behaviour of the db
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValue([inserted])
                })
    
            });
    
            const result = await createBookingService(booking)
            expect(db.insert).toHaveBeenCalledWith(BookingsTable)
            expect(result).toEqual("Bookings created successfully")
    
        })
    
        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockReturnValueOnce([null])
                })
            })
    
    
            const booking = {
                userId: 1,
                roomId: 2, 
                checkInDate: new Date(),
                checkOutDate: new Date(),
                totalAmount: "45,000"
    
            }
    
            const result = await createBookingService(booking)
            expect(result).toBeNull()
        })
    
      
    
    })
    
    
    describe("get booking service", () => {
          it("should get all bookings", async() => {
            const bookings = [
                {
                    bookingId: 1,
                    userId: 1,
                    roomId: 2,
                    checkInDate: new Date(),
                    checkOutDate: new Date(),
                    totalAmount: "45,000"
                },
                {
                    bookingId: 2,
                    userId: 2,
                    roomId: 3,
                    checkInDate: new Date(),
                    checkOutDate: new Date(),
                    totalAmount: "45,000"
                }
            ];
    
            (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValue(bookings)
    
            const result = await getAllBookingsService()
            expect(result).toEqual(bookings)
            expect(db.query.BookingsTable.findMany).toHaveBeenCalled()
          })
          it("should return an empty array if no bookings are found", async () => {
            (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValue([])

            const result = await getAllBookingsService()
            expect(result).toEqual([])
            expect(db.query.BookingsTable.findMany).toHaveBeenCalled()
          })


            
        
    })


    describe("getTodoByIdService", () => {
        it("should get a booking by id", async () => {
            const booking = {
                bookingId: 1,
                userId: 1,
                roomId: 2,
                checkInDate: new Date(),
                checkOutDate: new Date(),
                totalAmount: "45,000"
            };

            (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValue(booking)

            const result = await getBookingByIdService(1)
            expect(result).toEqual(booking)
            expect(db.query.BookingsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        })

        it("should return null if no booking is found", async () => {
            (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await getBookingByIdService(999)
            expect(result).toBeNull()
            expect(db.query.BookingsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        
    })

  })


describe("Update booking service", () => {
   it("should update a booking by id", async () => {

    const whereMock = jest.fn().mockResolvedValue(undefined);
    const setMock = jest.fn().mockReturnValue({ where: whereMock });
    (db.update as jest.Mock).mockReturnValue({ set: setMock });

    const result = await updateBookingService(1, {
        userId: 1,
        roomId: 2,
        checkInDate: new Date(),
        checkOutDate: new Date(),
        totalAmount: "45,000"
    });

    expect(result).toEqual("Booking updated successfully");
    expect(db.update).toHaveBeenCalledWith(BookingsTable);
    expect(setMock).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
   })
    
  })

  describe("Delete booking service", () => {
    it("should delete a booking by id", async () => {
    const whereMock = jest.fn().mockResolvedValue(undefined);
    const deleteMock = jest.fn().mockReturnValue({ where: whereMock });

    (db.delete as jest.Mock) = deleteMock;

    const result = await deleteBookingService(1);

    expect(result).toEqual("Booking deleted successfully");
    expect(deleteMock).toHaveBeenCalledWith(BookingsTable);
    expect(whereMock).toHaveBeenCalled();
});

  })



})