import express from 'express';
import User from '../models/usermodel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const isexistinguser = await User.findOne({ email });
        if (isexistinguser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
            sucess: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }})

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error', error });

        }
    }
export const Loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const User2 =await User.findOne({ email });
        if (!User2) {
            return res.status(400).json({ message: 'User dont already exists' });
        }

        const comaprepassword = await bcrypt.compare(password,User2.password);
        if(!comaprepassword){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
      
        const token = jwt.sign({ id: User2._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            message: "User Login successfully",
            token,
            sucess: true,
            user:User2 
        })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error', error });

        }
    }