import db from "../../src/Drizzle/db"
import { createRoomService, deleteRoomService, getAllRoomsService, getRoomByIdService, updateRoomService } from "../../src/Rooms/rooms.service"
import {  RoomsTable,  } from "../../src/Drizzle/schema"

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        RoomsTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
    
        }
    }
}))


beforeEach(() => {
    jest.clearAllMocks()
})

describe("Room service", () =>{
    describe("Create room service", () => {
        it("should insert a Room and return the inserted Room", async () => {
            const room = {
            roomId: 1,
            hotelId: 2,
            roomType: "Forest cabin",
            pricePerNight: "40000.00",
            capacity: 5,
            amenities: "Balcony, Fireplace, WiFi, Wild view",
            isAvailable: true,
    
            };
            const inserted = { id: 1, ...room };
            //chaining - checking behaviour of the db
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValue([inserted])
                })
    
            });
    
            const result = await createRoomService(room)
            expect(db.insert).toHaveBeenCalledWith(RoomsTable)
            expect(result).toEqual("Room was created successfully")
    
        })
    
        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockReturnValueOnce([null])
                })
            })
    
    
        const room = {
            roomId: 1,
            hotelId: 2,
            roomType: "Forest cabin",
            pricePerNight: "40000.00",
            capacity: 5,
            amenities: "Balcony, Fireplace, WiFi, Wild view",
            isAvailable: true,
    
            }
    
            const result = await createRoomService(room)
            expect(result).toBeNull()
        })
    
      
    
    })
    
    
    describe("get Room service", () => {
          it("should get all Rooms", async() => {
            const rooms = [
                {
                   roomId: 1,
                    hotelId: 2,
                    roomType: "Forest cabin",
                    pricePerNight: "40000.00",
                    capacity: 5,
                    amenities: "Balcony, Fireplace, WiFi, Wild view",
                    isAvailable: true,
                },
                {
                    RoomId: 2,
                    bookingId: 2,
                    amount: "40000",
                    RoomStatus: "Pending",
                    RoomMethod: "Card",
                    transactionId: "TX222"
                }
            ];
    
            (db.query.RoomsTable.findMany as jest.Mock).mockResolvedValue(rooms)
    
            const result = await getAllRoomsService()
            expect(result).toEqual(rooms)
            expect(db.query.RoomsTable.findMany).toHaveBeenCalled()
          })
          it("should return an empty array if no Rooms are found", async () => {
            (db.query.RoomsTable.findMany as jest.Mock).mockResolvedValue([])

            const result = await getAllRoomsService()
            expect(result).toEqual([])
            expect(db.query.RoomsTable.findMany).toHaveBeenCalled()
          })


            
        
    })


    describe("getTodoByIdService", () => {
        it("should get a Room by id", async () => {
            const room = {
                    roomId: 1,
                    hotelId: 2,
                    roomType: "Forest cabin",
                    pricePerNight: "40000.00",
                    capacity: 5,
                    amenities: "Balcony, Fireplace, WiFi, Wild view",
                    isAvailable: true,
            };

            (db.query.RoomsTable.findFirst as jest.Mock).mockResolvedValue(room)

            const result = await getRoomByIdService(1)
            expect(result).toEqual(room)
            expect(db.query.RoomsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        })

        it("should return null if no Room is found", async () => {
            (db.query.RoomsTable.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await getRoomByIdService(999)
            expect(result).toBeNull()
            expect(db.query.RoomsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        
    })

  })


describe("Update room service", () => {
   it("should update a room by id", async () => {

    const whereMock = jest.fn().mockResolvedValue(undefined);
    const setMock = jest.fn().mockReturnValue({ where: whereMock });
    (db.update as jest.Mock).mockReturnValue({ set: setMock });

    const result = await updateRoomService(1, {
                    roomId: 1,
                    hotelId: 2,
                    roomType: "Forest cabin",
                    pricePerNight: "40000.00",
                    capacity: 5,
                    amenities: "Balcony, Fireplace, WiFi, Wild view",
                    isAvailable: true,
    });

    expect(result).toEqual("Room updated successfully");
    expect(db.update).toHaveBeenCalledWith(RoomsTable);
    expect(setMock).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
   })
    
  })

  describe("Delete room service", () => {
    it("should delete a room by id", async () => {
    const whereMock = jest.fn().mockResolvedValue(undefined);
    const deleteMock = jest.fn().mockReturnValue({ where: whereMock });

    (db.delete as jest.Mock) = deleteMock;

    const result = await deleteRoomService(1);

    expect(result).toEqual("Room deleted successfully");
    expect(deleteMock).toHaveBeenCalledWith(RoomsTable);
    expect(whereMock).toHaveBeenCalled();
});

  })



})