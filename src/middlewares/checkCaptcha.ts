import { NextFunction, Request, Response } from "express";
import {config} from 'dotenv'
config()

export const checkCaptcha = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const captcha = req.body.captcha
        const secret = process.env.RECAPTCHA_SECRET
        const fetchResponce = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: "POST",
            body: `secret=${secret}&response=${captcha}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
              },
        })
        const data = await fetchResponce.json();
        
        if(data.success){
            next()
        }
    }
    catch(err){
        res.status(403).json({
            message: 'invalid captcha'
        })
    }
}