import { NextFunction, Request, Response } from "express";
export interface MyRequest<
  Req extends UserI | null,
  ReqBody = any,
  Params = any,
  ResBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: Req extends UserI ? Req : Req | null;
}

export interface UserRouter<T extends UserI | null> {
  controller: (req: MyRequest<T>, res: Response, next: NextFunction) => any;
}
