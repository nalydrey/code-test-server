import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, ValidateIf } from 'class-validator'

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 12)
    @IsAlphanumeric()
    userName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsOptional()  
    @ValidateIf((obj)=> obj.homePage)
    @IsUrl()
    homePage: string

    @IsString()
    @IsNotEmpty()
    text: string
}