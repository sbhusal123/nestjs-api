import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('bookmarks')
@UseGuards(JwtGuard)
@ApiBearerAuth() // <--- Swagger Bearer Auth
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDTO) {
        return this.bookmarkService.createBookmark(userId, dto)
    }

    // get all
    @HttpCode(HttpStatus.OK)
    @Get()
    getBookmarks(@GetUser('id') userId : number){
        return this.bookmarkService.getBookmarks(userId)
    }

    // Endpoint with params: Get Specific bookmark
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookId: number){
        return this.bookmarkService.getBookmarkById(userId, bookId)
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    updateBookmark(
        @GetUser('id') userId : number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: UpdateBookmarkDTO
    ){
        return this.bookmarkService.updateBookmark(userId, bookmarkId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmark(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ){
        return this.bookmarkService.deleteBookmark(userId, bookmarkId)
    }
}
