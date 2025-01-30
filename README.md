# NestJS Curated Reference:

- [1. Intro](./Reference/1.%20Intro.md)
    - Features
    - Typical Application Structure
    - Installation

- [2. Modules](./Reference/2.%20Modules.md)
    - Minimal Biolerplate

- [Controllers](./Reference/3.%20Controllers.md)
    - Usage Example

- [Providers](./Reference/4.%20Provder.md)
    - Intro and Usage Example

- [Setting Up DB with Prisma](./Reference/5.%20Setting%20Up%20Db.md)
    - Creating a Database
    - Prisma Initialization, Docs
    - Setting Up Database Connection

- [DTO : Data Transfer Object](./Reference/6.%20Data%20Transfer%20Object%20DTO.md)
    - Why DTO ?
    - Example and DTO usage in controller
    - Extracting Body From Incoming Request as a DTO
 
- [DTO and Payload Validation](./Reference/7.%20DTO%20and%20validations.md)
    - DTO => Validation with ``class-validators`` and ``class-transformers``
    - Applying validations to DTO
    - Initializing ``ValidationPipe`` as a ``GlobalPipe``.

- [Password Hasing With Argon](./Reference/8.%20Password%20Hashing%20with%20Argon.md)
    - SignUp logic to return a token.


- [DB Schema Changes, Exception Handling](./Reference/9.%20DB%20schema%20changes.md)
    - Bookmark table schema.
    - Signup and Signin logic with token creation.
    - Handling Exceptions from Prisma.

- [Configuration and ENV vars loading](./Reference/10.%20Configuration%20and%20EnvVars.md)
    - Setting up configuration with ``@nestjs/config`` on RootModule
    - Using CnofigModule on PrismaClient to parse DB connection string.

- [Passport JWT Authentication](./Reference/11.%20JWT%20passport%20authentication.md)
    - Setting up and Using JWT Module.
    - Intercepting and Validating a Token => injecting user on request.

- [Protecting Routes with Guards](./Reference/12.%20Logged%20In%20User,Me.md)
    - Implementing ``user/me`` endpoint
    - Custom Guards and Usage: ``JwtGuard`` refactored.

- [Custom Decorator: Get Logged In User in COntroller](./Reference/13.%20Custom%20Param%20Decorator.md)
    - ``@Req()`` decorator and usage.
    - Creating custom decorator to get currently auth user.

## Writing Test Cases

**External References**

- [Pactum API Testing: Pactum Guides](https://pactumjs.github.io/guides/api-testing.html)

- [Jest Getting Started](https://jestjs.io/docs/getting-started)

**Contents:**

- [1. Nest JS Testing Intro](./Reference/Testing/1.%20Intro.md)
    - Test Boilerplate Setup

- [2. Setting Up Test Application](./Reference/Testing/2.%20Setting%20Up%20Test%20Application.md)
    - Fixing Path Issue to resolve ``src``
    - Setting Up Test Application with Test Module

- [3. Setting Up Test Database](./Reference/Testing/3.%20Setup%20Test%20Database.md)
    - Using ``dotenv-cli`` to setup environment for test
    - Adjusting scripts to run test using ``.env.test``
    - Database TearDown logic, PrismaService

- [4. Writing First Test: SignIn and SignUp](./Reference/Testing/4.%20Writing%20First%20Test.md)
    - Pactum Usage, Assertions
    - Test Blocks: ``describe`` and ``it``.

- [5. Implementing User Service, Test Update, Get](./Reference/Testing/5.%20Test%20For%20Users.md)
    - Get, Update User Controller and Service
    - Testing With Pactum
    - Pactum Stores: Access Token
    - Body Contains Assertions

- [6. Implementing Bookmarks Endpoint](./Reference/Testing/6.%20Bookmarks%20Endpoints.md)
    - Using Param Decorator and Pipe for GET, Update and Delete endpoint.
    - Class validator for create and update DTO.
    - Bookmark CRUD service for DB.


- [Swagger Docs Generation](./Reference/14.%20Swagger%20Docs.md)
    - Swagger Setup with ``@nestjs/swagger``
    - Updating DTO to generate schema for request
    - Using `ApiProperty` decorator, Reference
