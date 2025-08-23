import express from 'express';
import { Loginuser, registerUser } from '../controller/usercontroller.js';

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',Loginuser)


export default router;