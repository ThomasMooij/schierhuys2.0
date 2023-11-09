import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { mongoose } from "mongoose";
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/users.route.js"
import reserveRoute from "./routes/reserve.route.js"
import reviewsRoute from "./routes/reviews.route.js"
import cookieParser from "cookie-parser";

dotenv.config()

const port = process.env.PORT

const app = express()

mongoose.set("strictQuery" , true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        throw(error);
    }
}

app.use(express.json())
app.use(cors({origin:" http://localhost:5173" , credentials: true}))
app.use(cookieParser())

app.use("/api/users" , usersRoute)
app.use("/api/auth" , authRoute)
app.use("/api/reserve" , reserveRoute)
app.use("/api/reviews" , reviewsRoute)

app.listen(port, ()=>{
    connect()
    console.log(`http://localhost:${port}`)
})



