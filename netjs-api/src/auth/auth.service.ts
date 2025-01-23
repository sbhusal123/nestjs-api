import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";

import * as argon from 'argon2'

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){

    }
    login(){
        return {"message": "I am logged in."}
    }

    async signUp(dto: AuthDTO){
        // generate password hash
        const password = await argon.hash(dto.password)

        // save the user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: password
            }
        })

        const {hash, ...data} = user

        return {
            "message": "User created",
            "data": data
        }
    }
}
