import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { AuthDTO } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // POST: /auth/signup
    @Post('signup')
    signUp(@Body() dto: AuthDTO) {
        console.log(dto)
        return this.authService.signUp()
    }

    // POST: /auth/signin
    @Post('signin')
    signIn(){
        return this.authService.login()
    }
}
