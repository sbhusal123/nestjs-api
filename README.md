# NestJS Curated Reference:

- [Intro](./Reference/1.%20Intro.md)

- [Modules](./Reference/2.%20Modules.md)

- [Controllers](./Reference/3.%20Controllers.md)

- [Providers](./Reference/4.%20Provder.md)

- [Setting Up DB with Prisma](./Reference/5.%20Setting%20Up%20Db.md)
    - [Accessing Prisma Module From Other Modules, Provider Module Injection](./Reference/5.%20Setting%20Up%20Db.md#8-accessing-prisma-service-from-other-modules)

- [DTO : Data Transfer Object](./Reference/6.%20Data%20Transfer%20Object%20DTO.md)

- [DTO and Payload Validation](./Reference/7.%20DTO%20and%20validations.md)

- [Password Hasing With Argon](./Reference/8.%20Password%20Hashing%20with%20Argon.md)

- [DB Schema Changes, Exception Handling](./Reference/9.%20DB%20schema%20changes.md)

- [Configuration and ENV vars loading](./Reference/10.%20Configuration%20and%20EnvVars.md)

- [Passport JWT Authentication](./Reference/11.%20JWT%20passport%20authentication.md)

- [Protecting Routes with Guards](./Reference/12.%20Logged%20In%20User,Me.md)
    - Implementing ``user/me`` endpoint
    - Custom Guards and Usage

- [Custom Decorator: Get Logged In User in COntroller](./Reference/13.%20Custom%20Param%20Decorator.md)
    - Modifying Response Status Codes

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

