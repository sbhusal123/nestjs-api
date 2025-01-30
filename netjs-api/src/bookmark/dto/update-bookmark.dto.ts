import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateBookmarkDTO {
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    title?: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    link?: string
}