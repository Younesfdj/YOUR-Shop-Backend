import { InternalError } from "../../errors/internal-error";
import { prismaClient } from "../../config/prisma";
import { BadRequestError } from "../../errors/bad-request";
import { ProductImage } from "../../types/ProductImage";
import { getProductService } from "./product.service";
import { log } from "../../utils/logger";
/**
 * @description  Add a ProductImage
 * @param newProductImage  - ProductImage
 * @returns  Error | BadRequestError | ProductImage
 */
export const addProductImageService = async (newProductImage: ProductImage) => {
  try {
    const productExists = await getProductService(newProductImage.ProductId);
    if (productExists instanceof BadRequestError) {
      return productExists;
    }
    const productImage = await prismaClient.productImage.create({
      data: {
        ProductId: newProductImage.ProductId,
        ProductImagePath: newProductImage.ProductImagePath,
      },
    });
    return {
      ProductImageId: productImage.ProductImageId,
      ProductId: productImage.ProductId,
      ProductImagePath: productImage.ProductImagePath,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
/**
 * @description  Add ProductImages
 * @param newProductImages  - ProductImage[]
 * @returns  Error | BadRequestError | ProductImage[]
 */

export const addProductImagesService = async (
  newProductImages: ProductImage[]
) => {
  try {
    const productImages = newProductImages.map(async (productImage) => {
      const result = await addProductImageService(productImage);
      if (result instanceof BadRequestError) {
        log.error("Failed to add product image\nError: ", result.message);
      } else {
        return result;
      }
    });
    return productImages;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

// now a service to delete a product image by id
export const deleteProductImageService = async (ProductImageId: number) => {
  try {
    const productImage = await prismaClient.productImage.delete({
      where: {
        ProductImageId,
      },
    });
    return productImage;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
