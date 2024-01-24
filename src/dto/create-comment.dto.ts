import { Allow, IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length, ValidateIf } from 'class-validator'

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 12)
    @IsAlphanumeric()
    userName: string

    @IsNumber()
    @ValidateIf((obj)=> obj.fileId)
    fileId: number

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsOptional()  
    @ValidateIf((obj)=> obj.homePage)
    @IsUrl()
    homePage: string

    @IsString()
    avatar: string

    @IsString()
    @IsNotEmpty()
    text: string
}