import sharp from "sharp";
import fs  from 'fs'
import { Repository } from "typeorm";
import { File } from "../entities/file.entity";
import { myDataSource } from "../data-source/data-source.init";
import { getExtantionFromString } from "../functions/get-extantion-from-string";

sharp.cache({files: 0})

export class FileService {

    constructor (
        private repo: Repository<File>,
        private folder: string = 'uploads', 
    ) {}

    async resizePicture(fileName: string){
            const ext = getExtantionFromString(fileName)
            const newName = `picture-${Date.now()}.${ext}` 
            const sourcePath = `${this.folder}/${fileName}`
            const distPath = `${this.folder}/${newName}`
            
            const image = sharp(sourcePath)
            const metadata =await image.metadata()
            const width = metadata.width
            const height = metadata.height

            if(width && height){
                let newMetadata
                if(width >= height && width > 320){
                    newMetadata = await image.resize(320).toFile(distPath)
                }
                else if (height && height > 240){
                    newMetadata = await image.resize(null, 240).toFile(distPath)
                }
                else {
                     newMetadata = await image.toFile(distPath)
                }
                this.deleteFile(fileName)
                
                return {
                    name: newName,
                    size: newMetadata?.size || 0
                }
            }

    }


    createFile (fileName: string, size: number) {
        const file = new File()
        file.name = fileName
        file.size = size
        return this.repo.save(file)
    }

    async updateFile (id: number, fileName: string, size: number) {
        const file = await this.repo.findOneBy({id})
        if(file){
            file.name = fileName
            file.size = size
            return this.repo.save(file)
        }
    }

    async deleteFileNote (id: number) {
        const file = await this.repo.findOneBy({id})
        await this.repo.delete(id)
        return file 
    }



    async deleteFile (fileName: string) {
        const deletedPromise = new Promise<boolean>((res, rej) => {
            fs.rm(`${this.folder}/${fileName}`, (err) => {
                if(err) {
                    rej(new Error('файл не удален'))
                } 
                else{
                   res(true)
                }
            })
        })
        return deletedPromise
    }

    getDocumentById (id: number) {
        return this.repo.findOneBy({id})
    }
}
export const fileService = new FileService(myDataSource.getRepository(File))