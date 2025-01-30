import { PartialType } from "@nestjs/swagger"

import { CreateBookmarkDTO } from "./create-bokomark.dto"

export class UpdateBookmarkDTO extends PartialType(CreateBookmarkDTO) {
}