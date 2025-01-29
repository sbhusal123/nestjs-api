import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'

describe('App e2e', () => {

  let app: INestApplication;

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
  })

  // test block
  it.todo('should pass')

  // after runing all the test (at the end)
  afterAll(() => {
    app.close()
  })
})