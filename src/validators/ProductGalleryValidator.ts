import { Request, Response, NextFunction } from "express";
import { ProductImageSchema } from "../schema/ProductImageSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
export const ProductGalleryValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.body instanceof Array)) {
    return next(new UnprocessedEntityError("Body should be an array.", 1006));
  }
  // checks the type of every item in the array
  const productGalleryArray = req.body;
  productGalleryArray.forEach((i) => {
    const { error } = ProductImageSchema.safeParse(i);
    if (error) {
      return next(new UnprocessedEntityError(error.message, 1006));
    }
  });
  next();
};
