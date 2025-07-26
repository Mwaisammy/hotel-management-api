import { drizzle } from "drizzle-orm/neon-http"
  import { neon } from '@neondatabase/serverless'
  import * as schema from "./schema"
   import "dotenv/config"

//   export const client = new Client({
//       connectionString: process.env.Database_URL as string
    
//   })
  
//   const main = async () => {
//       await client.connect()
//     //   console.log("here..",client)
//   }
//   main().then(() => {
//       console.log("Connected to the database")
//   }).catch((error) => {
//       console.error("Error connecting to the database:", error)
//   })

const sql = neon(process.env.Database_URL!)

  const db = drizzle(sql, { schema, logger: false })
 console.log("Connected to the database")


  export default db;