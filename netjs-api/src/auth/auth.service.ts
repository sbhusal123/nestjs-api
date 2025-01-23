import { ForbiddenException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";

import * as argon from 'argon2'

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){}

    async login(dto: AuthDTO){
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.password
            }
        })

        // if user does not exists, throw exception
        if(!user){
            throw new ForbiddenException("Credentials Incorrect")
        }

        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password)


        // if password incorrect throw exception
        if(!pwMatches){
            throw new ForbiddenException("Credentials Incorrect")
        }

        const {hash, ...data} = user
        return data
    }

    async signUp(dto: AuthDTO){
        // generate password hash
        const password = await argon.hash(dto.password)

        // save the user
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: password
                }
            })

            const {hash, ...data} = user

            return data
        } catch(error) {
            if(error  instanceof Prisma.PrismaClientKnownRequestError){
                // "Unique constraint failed on the {constraint}"
                if(error.code == "P2002") {
                    throw new ForbiddenException('Credentials taken.')
                }
            }
            throw error
        }
    }
}
