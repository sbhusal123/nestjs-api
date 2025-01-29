import { IsOptional, IsString } from "class-validator"

export class CreateBookmarkDTO {
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsString()
    link: string
}