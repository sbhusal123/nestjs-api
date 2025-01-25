import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { AuthDTO } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // POST: /auth/signup
    @Post('signup')
    signUp(@Body() dto: AuthDTO) {
        console.log(dto)
        return this.authService.signUp(dto)
    }

    // POST: /auth/signin
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: AuthDTO){
        return this.authService.login(dto)
    }
}
