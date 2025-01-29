import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { BookmarkController } from './bookmark.controller';

@Module({
  providers: [BookmarkService],
  controllers: [BookmarkController],
  imports: [PrismaModule]
})
export class BookmarkModule {}
