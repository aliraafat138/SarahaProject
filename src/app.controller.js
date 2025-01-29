import connectDB from "./DB/db.connection.js"
import { generalErrorHandling } from "./utilis/error/error.js"
import authController from './modules/Auth/auth.controller.js'
import userController from './modules/User/user.controller.js'
import messageController from './modules/Message/message.controller.js'
const bootStrap = (app, express) => {
    app.use(express.json())
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/auth', authController)
    app.use('/users', userController)
    app.use('/messages', messageController)
    app.all('*', res => {
        return res.status(404).json({ message: "Invalid Routing" })
    })
    app.use(generalErrorHandling)
    connectDB()
}

export default bootStrap;