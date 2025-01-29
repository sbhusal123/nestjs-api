import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // switchToHttp -> returns request object of express
    const request = ctx.switchToHttp().getRequest();
    const user =  request.user;

    const {hash, ...userInfo} = user
    return data ? userInfo[data] : userInfo
  },
);

