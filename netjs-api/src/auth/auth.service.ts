import { ForbiddenException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";

import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}

    async login(dto: AuthDTO){
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
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

        return this.signToken(user.id, user.email)
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
            return this.signToken(user.id, user.email)
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

    // create a token
    async signToken(userId: number, email: string) : Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            secret: secret,
            expiresIn: '15m'
        })

        return {
            access_token: token
        }
    }
}
