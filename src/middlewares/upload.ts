import { NextFunction, Request, Response } from "express"
import multer, { FileFilterCallback } from "multer"
import path from 'path'
import { getExtantionFromString } from "../functions/get-extantion-from-string"
import { documentFormats, pictureFormats } from "../data/allowed-files"

const checkExtantion = (allowedFormats: string[]) => {
    return (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        const extantion = getExtantionFromString(file.originalname)
        if(extantion && allowedFormats.includes(extantion)){
            callback(null, true)
        }
        else(
            callback(new Error('недопустимый формат'))
        )
    }
}


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, `${__dirname}/../../uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}` + '-' + Date.now() + path.extname(file.originalname))
    }
})

const pictureUp = multer({
    storage,
    fileFilter: checkExtantion(pictureFormats),
}).single('file')

const documentUp = multer({
    storage,
    fileFilter: checkExtantion(documentFormats),
    limits: {
        fileSize: 100
    },
}).single('file')

const nextHandler = (err: any, res: Response, next: NextFunction) => {
    try{
        if (err) {
            throw new Error(err.message)
        } 
        next()
     }
    catch(err){
        if(err instanceof Error){
            res.status(406).json({
             message: err.message
            })
        }
    }
}


export const pictureUpload =  (req: Request, res: Response, next: NextFunction) => {
    console.log('picture');
    
    pictureUp(req, res, (err) => {
        nextHandler(err, res, next)
    })
}

export const documentUpload =  (req: Request, res: Response, next: NextFunction) => {
    console.log('document');
    documentUp(req, res, (err) => {
        nextHandler(err, res, next)
    })
}

