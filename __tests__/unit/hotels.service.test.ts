import db from "../../src/Drizzle/db"
import { createHotelService, deleteHotelservice, getAllHotelsService, getHotelsByIdService, updateHotelservice } from "../../src/hotels/hotels.service"
import {  HotelsTable,  } from "../../src/Drizzle/schema"

jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        HotelsTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
    
        }
    }
}))


beforeEach(() => {
    jest.clearAllMocks()
})

describe("hotel service", () =>{
    describe("Create hotel service", () => {
        it("should insert a hotel and return the inserted hotel", async () => {
            const hotel = {
                hotelId:1,
                    name: "Safari Lodge",
                    location: "Nairobi",
                    address: "123 Safari St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
    
            };
            const inserted = { id: 1, ...hotel };
            //chaining - checking behaviour of the db
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValue([inserted])
                })
    
            });
    
            const result = await createHotelService(hotel)
            expect(db.insert).toHaveBeenCalledWith(HotelsTable)
            expect(result).toEqual("Hotel was created")
    
        })
    
        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockReturnValueOnce([null])
                })
            })
    
    
            const hotel = {
                   hotelId:1,
                    name: "Safari Lodge",
                    location: "Nairobi",
                    address: "123 Safari St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
    
            }
    
            const result = await createHotelService(hotel)
            expect(result).toBeNull()
        })
    
      
    
    })
    
    
    describe("get hotel service", () => {
          it("should get all hotels", async() => {
            const hotels = [
                {
                    hotelId:1,
                    name: "Safari Lodge",
                    location: "Nairobi",
                    address: "123 Safari St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
                },
                {
                    hotelId: 2,
                    name: "Meru Lodge",
                    location: "Meru",
                    address: "123 Meru St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
                }
            ];
    
            (db.query.HotelsTable.findMany as jest.Mock).mockResolvedValue(hotels)
    
            const result = await getAllHotelsService()
            expect(result).toEqual(hotels)
            expect(db.query.HotelsTable.findMany).toHaveBeenCalled()
          })
          it("should return an empty array if no hotels are found", async () => {
            (db.query.HotelsTable.findMany as jest.Mock).mockResolvedValue([])

            const result = await getAllHotelsService()
            expect(result).toEqual([])
            expect(db.query.HotelsTable.findMany).toHaveBeenCalled()
          })


            
        
    })


    describe("getTodoByIdService", () => {
        it("should get a hotel by id", async () => {
            const hotel = {
                    hotelId:1,
                    name: "Safari Lodge",
                    location: "Nairobi",
                    address: "123 Safari St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
            };

            (db.query.HotelsTable.findFirst as jest.Mock).mockResolvedValue(hotel)

            const result = await getHotelsByIdService(1)
            expect(result).toEqual(hotel)
            expect(db.query.HotelsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        })

        it("should return null if no hotel is found", async () => {
            (db.query.HotelsTable.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await getHotelsByIdService(999)
            expect(result).toBeNull()
            expect(db.query.HotelsTable.findFirst).toHaveBeenCalledWith({
                where: expect.any(Object)
            })
        
    })

  })


describe("Update hotel service", () => {
   it("should update a hotel by id", async () => {

    const whereMock = jest.fn().mockResolvedValue(undefined);
    const setMock = jest.fn().mockReturnValue({ where: whereMock });
    (db.update as jest.Mock).mockReturnValue({ set: setMock });

    const result = await updateHotelservice(1, {
                    hotelId:1,
                    name: "Safari Lodge",
                    location: "Nairobi",
                    address: "123 Safari St",
                    contactPhone: "0790111222",
                    category: "Luxury",
                    rating: "4.5"
    });

    expect(result).toEqual("Hotel updated successfully");
    expect(db.update).toHaveBeenCalledWith(HotelsTable);
    expect(setMock).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
   })
    
  })

  describe("Delete hotel service", () => {
    it("should delete a hotel by id", async () => {
    const whereMock = jest.fn().mockResolvedValue(undefined);
    const deleteMock = jest.fn().mockReturnValue({ where: whereMock });

    (db.delete as jest.Mock) = deleteMock;

    const result = await deleteHotelservice(1);

    expect(result).toEqual("Hotel deleted successfully");
    expect(deleteMock).toHaveBeenCalledWith(HotelsTable);
    expect(whereMock).toHaveBeenCalled();
});

  })



})