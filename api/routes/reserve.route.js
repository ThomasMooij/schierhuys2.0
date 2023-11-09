import express from "express"
import {verifyToken} from "../functions/jwt.js"
import {
    intent,
    getReserves, 
    getReserve, 
    getUnavailables, 
    unSetUnavailables, 
    deleteReserve,
    setUnavailables, 
    confirm } from "../controllers/reserve.controller.js"

const router = express.Router()

router.post("/create-payment-intent", intent)
router.get("/", verifyToken, getReserves)
router.get("/unavailable" , getUnavailables)
router.put("/unavailable" ,verifyToken, unSetUnavailables)
router.put("/setUnavailable" , setUnavailables)
router.put("/" , confirm)
router.get("/:id", verifyToken, getReserve)
router.delete("/:id", verifyToken, deleteReserve)


export default router