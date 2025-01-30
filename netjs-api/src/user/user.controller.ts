import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDTO } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('users')
@ApiBearerAuth()// <--- Swagger Bearer Auth
export class UserController {

    constructor(private userService: UserService){}

    // GET users/me
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User){
        return user
    }

    @UseGuards(JwtGuard)
    @Patch()
    updateUser(@GetUser('id') userId : number, @Body() dto :UpdateUserDTO){
        return this.userService.updateUser(userId, dto)
    }
}
