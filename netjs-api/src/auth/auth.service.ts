import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login(){
        return {"message": "I am logged in."}
    }

    signUp(){
        return {"message": "Please sign up."}
    }
}
