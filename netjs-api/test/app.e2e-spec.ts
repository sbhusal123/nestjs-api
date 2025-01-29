import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

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

    prisma = app.get(PrismaService)

    // clean database
    await prisma.cleanDb()
  })

  // test block
  it.todo('should pass')

  // after runing all the test (at the end)
  afterAll(() => {
    app.close()
  })
})