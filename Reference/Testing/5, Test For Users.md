# Implementing User Service:

Get and Update User Endpoint, Test

- Create Controller: ``npx nest g controller user``

- Create Service: ``npx nest g service user``

**user/user.controller.ts**
```js
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
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
```

Note, we can use ``@Patch()`` for update user endpoint.

**user/user.service.ts**

```js
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    updateUser(userId: number, dto: UpdateUserDTO){
        return this.prisma.user.update({
            where: {id: userId},
            data: {
                ...dto
            }
        })
    }
}
```


## Writing Tests:

```js
import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

import {HttpStatus} from '@nestjs/common'



import * as pactum from 'pactum'
import { AuthDTO } from 'src/auth/dto';
import { UpdateUserDTO } from 'src/user/dto';

describe('App e2e', () => {

  //   ...

  const dto: AuthDTO = {
    email: "fake@gmail.com",
    password: "adasdlkj"
  }

  describe('User', () => {

    describe('Signin', () => {

      it('should signin', () => {
        return pactum.spec().post(
          "/auth/signin"
        ).withBody(dto)
        .expectStatus(HttpStatus.OK)
        .expectJsonSchema('access_token', {
          "type": "string"
        }).stores('userToken', 'access_token') // <- store the token
      })
    })


    // Get currently authenticated user
    describe('Get me', () => {
      it('should get the current user', () => {
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: "Bearer $S{userToken}" // <-- Access Token Stored Here
        }).expectStatus(HttpStatus.OK)
        .expectBodyContains(dto.email)
      })
    })

    describe('Edit User', () => {
       const updateUser: UpdateUserDTO = {
          firstName: "Ramesh",
          lastName: "Shrestha",
       }
        it('should update the user', () => {
          return pactum.spec().patch('/users')
          .withHeaders({
            Authorization: "Bearer $S{userToken}"
          }).withBody({
            ...updateUser
          })
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(updateUser.firstName)
          .expectBodyContains(updateUser.lastName)
          .expectBodyContains(dto.email)
        })        
      })

      it('should throw error when invalid email', () => {
          return pactum.spec().patch('/users')
          .withHeaders({
            Authorization: "Bearer $S{userToken}"
          }).withBody({
            email: "asdasd"
          })
          .expectStatus(HttpStatus.BAD_REQUEST)
      })
    
  })

  afterAll(() => {
    app.close()
  })
})
```

- [``expectBodyContains(value)``](https://pactumjs.github.io/api/assertions/expectBodyContains.html) assertion used so that the body contains value.

- [``.stores('userToken', 'access_token')``](https://pactumjs.github.io/api/requests/stores.html#stores) stores the value of `access_token` from object into ``userToken`` variable.

- Store variable can be accessed with ["$S{userToken}"](https://pactumjs.github.io/api/requests/stores.html#stores)

