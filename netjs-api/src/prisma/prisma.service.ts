import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
   
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }

    // clean records from database
    // transaction makes sure the 
    // sql statement delete is exdcuted first for
    // bookmarks and then uer, i.e. order is preserved
    cleanDb(){
        return this.$transaction([
            this.bookmarks.deleteMany(),
            this.user.deleteMany()
        ])
    }
}
