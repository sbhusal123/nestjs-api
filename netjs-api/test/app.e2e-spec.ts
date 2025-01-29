import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

import {HttpStatus} from '@nestjs/common'



import * as pactum from 'pactum'
import { AuthDTO } from 'src/auth/dto';
import { UpdateUserDTO } from 'src/user/dto';

describe('App e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  // before runing all test cases (at the begining)
  beforeAll(async () => {
    
    // create a test module out of the main module: App
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // create a nest application for test
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)

    // clean database
    await prisma.cleanDb()

    // base url setup
    pactum.request.setBaseUrl("http://localhost:3333")
  })

  const dto: AuthDTO = {
    email: "fake@gmail.com",
    password: "adasdlkj"
  }

  describe('Auth', () => {

    describe('Signup', () => {
      it('should signup', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody(dto)
        .expectStatus(HttpStatus.CREATED)
      })

      it('should throw if email empty', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody({
          password: "Asdasd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })

      it('should throw if password empty', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody({
          email: "email@asd.asd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })

      it('should throw if invalid email', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody({
          email: "email",
          password: "asd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })

      it('should throw if duplicate email', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody(dto)
        .expectStatus(HttpStatus.FORBIDDEN)
      })

      it('should throw if no body', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody(dto)
        .expectStatus(HttpStatus.FORBIDDEN)
      })        

    })

    describe('Signin', () => {

      it('should throw if email empty', () => {
        return pactum.spec().post(
          "/auth/signin"
        ).withBody({
          password: "Asdasd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })

      it('should throw if password empty', () => {
        return pactum.spec().post(
          "/auth/signin"
        ).withBody({
          email: "email@asd.asd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })

      it('should throw if invalid email', () => {
        return pactum.spec().post(
          "/auth/signin"
        ).withBody({
          email: "email",
          password: "asd"
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      })


      it('should throw if no body', () => {
        return pactum.spec().post(
          "/auth/signup"
        ).withBody(dto)
        .expectStatus(HttpStatus.FORBIDDEN)
      })      

      it('should signin', () => {
        return pactum.spec().post(
          "/auth/signin"
        ).withBody(dto)
        .expectStatus(HttpStatus.OK)
        .expectJsonSchema('access_token', {
          "type": "string"
        }).stores('userToken', 'access_token')
      })

    })
  })

  describe('User', () => {

    describe('Get me', () => {
      it('should get the current user', () => {
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: "Bearer $S{userToken}"
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

  describe('Bookmarks', () => {

    describe('Get Bookmarks', () => {
      it('should return empty bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({
          Authorization: "Bearer $S{userToken}"
        }).expectBody([])
      })
    })

    describe('Get Bookmark By ID', () => {
      
    })

    describe('Create Bookmark', () => {

    })

    describe('Edit Bookmark By ID', () => {})

    describe('Delete Bookmark By ID', () => {})      
    
  })

  // after runing all the test (at the end)
  afterAll(() => {
    app.close()
  })
})