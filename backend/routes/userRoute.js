import express from 'express';
import { Loginuser, registerUser, userprofile } from '../controller/usercontroller.js';
import authMiddleware from '../middleware/Authmiddelware.js';

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',Loginuser)
router.get('/userprofile',authMiddleware,userprofile)

export default router;