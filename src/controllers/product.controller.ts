import { Request, Response, NextFunction } from "express";
import {
  getProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
  addProductService,
} from "../services/inventory/product.service";
import { StatusCodes } from "http-status-codes";
import { ProductSchema } from "../schema/ProductSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await getProductService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getProductsService();
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = req.body;
  const result = await addProductService(newProduct);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.CREATED).json(result);
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const newProduct = req.body;
  const result = await updateProductService(parseInt(id), newProduct);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await deleteProductService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};
