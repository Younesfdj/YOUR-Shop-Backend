import { prismaClient } from "../../config/prisma";
import { BadRequestError } from "../../errors/bad-request";
import { Category } from "../../types/Category";
import { InternalError } from "../../errors/internal-error";
/**
 * @description  Get category by Id
 * @param categoryId  - number
 * @returns  Error | BadRequestError | Category
 */

export const getCategoryService = async (CategoryId: number) => {
  try {
    const category = await prismaClient.category.findUnique({
      where: {
        CategoryId,
      },
    });
    if (!category) {
      return new BadRequestError("category not found", 2001);
    }

    return {
      categoryName: category.CategoryName,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Get categories
 * @returns  Error | BadRequestError | Category[]
 */

export const getCategoriesService = async () => {
  try {
    const categories = await prismaClient.category.findMany();
    return categories;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Add category
 * @param newcategory  - Category
 * @returns  Error | BadRequestError | Category
 */

export const addCategoryService = async (newcategory: Category) => {
  try {
    const category = await prismaClient.category.create({
      data: {
        CategoryName: newcategory.CategoryName,
      },
    });

    return {
      categoryId: category.CategoryId,
      categoryName: category.CategoryName,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Update category by Id
 * @param categoryId  - number
 * @param newcategory  - Category
 * @returns  Error | BadRequestError | Category
 */

export const updateCategoryService = async (
  CategoryId: number,
  newcategory: Category
) => {
  try {
    const categoryExists = await prismaClient.category.findUnique({
      where: {
        CategoryId,
      },
    });
    if (!categoryExists) {
      return new BadRequestError("category not found", 2001);
    }

    const category = await prismaClient.category.update({
      where: {
        CategoryId,
      },
      data: {
        CategoryName: newcategory.CategoryName,
      },
    });

    return {
      CategoryId: category.CategoryId,
      CategoryName: category.CategoryName,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Delete category by Id
 * @param categoryId  - number
 * @returns  Error | BadRequestError | Category
 */

export const deleteCategoryService = async (CategoryId: number) => {
  try {
    const categoryExists = await prismaClient.category.findUnique({
      where: {
        CategoryId,
      },
    });
    if (!categoryExists) {
      return new BadRequestError("category not found", 2001);
    }

    const category = await prismaClient.category.delete({
      where: {
        CategoryId,
      },
    });

    return {
      CategoryId: category.CategoryId,
      CategoryName: category.CategoryName,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
