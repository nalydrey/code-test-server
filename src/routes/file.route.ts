import { Router } from "express";
import { fileController } from "../controllers/file.controller";
import { documentUpload, pictureUpload } from "../middlewares/upload";
import { fileService } from "../services/file.service";



export const fileRouter = Router()

fileRouter.post('/picture', pictureUpload, fileController.createPicture.bind(fileController))

fileRouter.post('/document', documentUpload, fileController.createDocument.bind(fileController))

fileRouter.put('/picture/:id', pictureUpload, fileController.updatePicture.bind(fileController))

fileRouter.put('/document/:id', documentUpload, fileController.updateDocument.bind(fileController) )

fileRouter.get('/download/document/:id', fileController.downloadDocument.bind(fileController))

fileRouter.delete('/:id', fileController.deleteFile.bind(fileController))




