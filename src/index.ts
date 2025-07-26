import express from 'express'
import auth from './auth/auth.router';
import users from './Users/user.router';
import booking from './Bookings/booking.router';
import payment from './Payments/payments.router';
import hotel from './Hotels/hotels.router';
import room from './Rooms/rooms.router';
import ticket from './SupportTickets/supportTickets.router';
import cors from 'cors'


const initializeApp = () => {
    const app = express()
     app.use(cors({
        origin: 'http://localhost:5173',
        methods: ["GET","POST","PUT","DELETE"]

    }))
   
    
    app.use(express.json());
    
    
    // routes
    auth(app)
    users(app)
    booking(app)
    payment(app)
    hotel(app)
    room(app)
    ticket(app)
    
    
    app.get('/', (req, res) => {
        res.send('Hello world')
    })

    return app
    
}

const app = initializeApp()
export default app
