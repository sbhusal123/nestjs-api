import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
        constructor(private prisma: PrismaService){}

        async createBookmark(userId: number, dto: CreateBookmarkDTO){
            return this.prisma.bookmarks.create({
                data:{
                    userId,
                    ...dto
                }
            })
        }

        async getBookmarks(userId: number){
            const books = await this.prisma.bookmarks.findMany({
                where: {
                    userId: userId
                }
            })
            return books ? books : []
        }

        async getBookmarkById(userId: number, bookmarkId: number){
            const bookmark = await this.prisma.bookmarks.findFirst({
                where: {
                    id: bookmarkId,
                    userId
                }
            })

            if(!bookmark){
                throw new ForbiddenException("Cannot find bookmark with provided id.")
            } else {
                return bookmark
            }
        }

        async updateBookmark(userId: number, bookmarkId: number, dto: UpdateBookmarkDTO){
            const bookmark = await this.getBookmarkById(userId, bookmarkId)
            return this.prisma.bookmarks.update({
                where: {id: bookmarkId},
                data: {...dto}
            })
        }

        async deleteBookmark(userId: number, bookmarkId: number){
            const bookmark = await this.getBookmarkById(userId, bookmarkId)
            this.prisma.bookmarks.delete({
                where: {id: bookmarkId, userId}
            })
            return {}
        }
}
