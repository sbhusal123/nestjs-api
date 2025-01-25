import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // switchToHttp -> returns request object of express
    const request = ctx.switchToHttp().getRequest();
    const user =  request.user;

    const {hash, ...userInfo} = user
    return userInfo
  },
);

