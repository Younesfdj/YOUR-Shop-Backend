import { Request, Response, NextFunction } from "express";
import {
  getCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  addCategoryService,
} from "../services/inventory/category.service";
import { StatusCodes } from "http-status-codes";
import { log } from "../utils/logger";
import { ProductSchema } from "../schema/ProductSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await getCategoryService(parseInt(id));
  if (result instanceof Error) return next(result);
  log.info("Category fetched successfully \n", result);
  res.status(StatusCodes.OK).json(result);
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getCategoriesService();
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newCategory = req.body;
  const result = await addCategoryService(newCategory);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.CREATED).json(result);
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const newCategory = req.body;
  const result = await updateCategoryService(parseInt(id), newCategory);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = ProductSchema.shape.ProductId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await deleteCategoryService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
};
