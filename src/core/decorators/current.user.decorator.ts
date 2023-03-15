import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {User} from "../models/user/user.model";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        return request.user as User;
    },
);
