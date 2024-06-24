import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
export type UsersTypes = User;
export interface MyRequest<
  Req extends UsersTypes | null,
  ReqBody = any,
  Params = any,
  ResBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: Req extends UsersTypes ? Req : Req | null;
}

export interface UserRouter<T extends UsersTypes | null> {
  controller: (req: MyRequest<T>, res: Response, next: NextFunction) => any;
}
