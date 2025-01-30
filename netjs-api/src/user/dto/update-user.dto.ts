import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDTO{
    @ApiProperty({required: false})
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    lastName?: string
}
