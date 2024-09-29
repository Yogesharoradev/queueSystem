import express from  "express"
import addRequestToQueue from "../controller/queue.controller.js"

const router = express.Router()

router.post("/add" , addRequestToQueue)



export default router