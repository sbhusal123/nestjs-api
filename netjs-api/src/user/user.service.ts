import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    updateUser(userId: number, dto: UpdateUserDTO){
        return this.prisma.user.update({
            where: {id: userId},
            data: {
                ...dto
            }
        })
    }
}
