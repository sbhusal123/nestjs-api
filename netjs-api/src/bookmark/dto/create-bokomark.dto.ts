import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreateBookmarkDTO {
    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty()
    @IsString()
    link: string
}