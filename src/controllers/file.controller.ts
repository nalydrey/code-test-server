import { Request, Response } from "express";
import { FileService, fileService } from "../services/file.service";
import path from 'path'
import fs from 'fs'

export class FileController {
    
    constructor (private fileService: FileService){}

    

    async createPicture (req: Request, res: Response) {
        console.log(req.file);
        
        if(req.file){
            const resizedPicture = await this.fileService.resizePicture(req.file.filename)
            if(resizedPicture){
                const {name, size} = resizedPicture
                const file = await this.fileService.createFile(name, size)
                res.status(200).json({
                    file
                })
            }
        }
    }

    async createDocument (req: Request, res: Response){
        console.log(req.file);
        if(req.file){
            const {filename, size} = req.file
            const file = await this.fileService.createFile(filename, size)
            res.status(200).json({
                file
            })
        }
    }

    async updatePicture (req: Request, res: Response) {
        console.log('updatePicture');
        
        if(req.file){
            const resizedPicture = await this.fileService.resizePicture(req.file.filename)
            if(resizedPicture){
                const oldFile = await this.fileService.getDocumentById(+req.params.id)
                oldFile && await this.fileService.deleteFile(oldFile.name)
                const {name, size} = resizedPicture
                const file = await this.fileService.updateFile(+req.params.id, name, size)
                res.status(200).json({
                    file
                })
            }
        }
    }
  
    async updateDocument (req: Request, res: Response) {
        console.log('updateDocument');
        if(req.file){
            const {filename, size} = req.file
            const oldFile = await this.fileService.getDocumentById(+req.params.id)
            oldFile && await this.fileService.deleteFile(oldFile.name)
            const file = await this.fileService.updateFile(+req.params.id, filename, size)
            res.status(200).json({
                file
            })
        }
    }


    async downloadDocument ( req: Request, res: Response ) {
        console.log('download');
        const file = await this.fileService.getDocumentById(+req.params.id)
        if(file){
            const filePath = path.join(__dirname , '..', '..', 'uploads', file.name)
        //     console.log(filePath);
        //     res.download(filePath)
        fs.readFile(filePath, (err, data) => {
            if(err) throw new Error('файл не прочитан')
            res.end(data)
        })
        }
    }


    async deleteFile (req: Request, res: Response) {
        const file = await this.fileService.deleteFileNote(+req.params.id)
        if(file){
            await this.fileService.deleteFile(file.name)
        }
        res.status(200).json({
            file
        })
    }
}

export const fileController = new FileController(fileService)