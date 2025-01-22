import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){

    }
    login(){
        return {"message": "I am logged in."}
    }

    signUp(){
        return {"message": "Please sign up."}
    }
}
