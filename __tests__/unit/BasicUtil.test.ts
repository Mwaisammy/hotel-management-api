import { product } from "../../src/BasicUtils"
describe("Product", () => {

    it("should return the product of two numbers", () => {
        const actual = product(3, 2)

        expect(actual).toBe(6)
    })
})
   
    



