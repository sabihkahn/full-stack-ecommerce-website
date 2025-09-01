 import mongoose from "mongoose";
 import express from 'express'
import { getaiprompt } from "../controller/getaiprompt.js";

 const router = express.Router()

 router.post('/sendaidata',getaiprompt)

 export default router