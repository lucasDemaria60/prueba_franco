import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
export class CreateUsuarioDto {

    @IsNumber()
    @IsNotEmpty()
    id: number
    @IsString()
    @IsNotEmpty()
    usuario: string
    @IsString()
    @IsNotEmpty()
    contraseña: string 
}
