import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';

// @GetUser: Reqeust에서 user 가져오기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
