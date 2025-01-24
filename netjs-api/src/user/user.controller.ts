import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {

    // GET users/me
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request){
        return 'user info'
    }
}
