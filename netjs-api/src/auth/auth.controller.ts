import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // POST: /auth/signup
    @Post('signup')
    signUp() {
        return 'I am signups.'
    }

    // POST: /auth/signin
    @Post('signin')
    signIn(){
        return 'I am signin.'
    }
}
