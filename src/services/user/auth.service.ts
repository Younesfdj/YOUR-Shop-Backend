import { $Enums } from "@prisma/client";
import { prismaClient } from "../../config/prisma";
import { BadRequestError } from "../../errors/bad-request";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { InternalError } from "../../errors/internal-error";

/**
 * @description  Register a user
 * @param email  - String
 * @param password - String
 * @param name - String
 * @param phone - String
 * @param role - "USER" | "ADMIN
 * @returns  Error | BadRequestError | object
 */

const registerUserService = async (
  UserEmail: string,
  UserName: string,
  UserPassword: string,
  UserPhone: string,
  UserRole: $Enums.Role = "USER"
) => {
  try {
    const userExist = await prismaClient.user.findFirst({
      where: {
        UserEmail,
      },
    });
    if (userExist) {
      return new BadRequestError("User already exist", 1002);
    }
    const result = await prismaClient.user.create({
      data: {
        UserEmail,
        UserName,
        UserPassword: hashPassword(UserPassword),
        UserPhone,
        UserRole,
      },
    });
    const token = generateToken({
      UserId: result.UserId,
      UserRole: result.UserRole,
    });
    return {
      data: {
        id: result.UserId,
        UserEmail: result.UserEmail,
        UserName: result.UserName,
        UserPhone: result.UserPhone,
        UserRole: result.UserRole,
      },
      token,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Login a user
 * @param email  - String
 * @param password - String
 * @returns  Error | BadRequestError | object
 */

const loginUserService = async (email: string, password: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        UserEmail: email,
      },
    });

    if (!user) return new BadRequestError("User not found", 1001);

    if (!comparePassword(password, user.UserPassword))
      return new BadRequestError("Invalid password", 1003);

    const token = generateToken({
      UserId: user.UserId,
      UserRole: user.UserRole,
    });

    return {
      data: {
        id: user.UserId,
        UserEmail: user.UserEmail,
        UserName: user.UserName,
        UserPhone: user.UserPhone,
        UserRole: user.UserRole,
      },
      token,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Register a user
 * @param email  - String
 * @param password - String
 * @param name - String
 * @param phone - String
 * @returns  Error | BadRequestError | object
 */

const registerAdminService = async (
  UserEmail: string,
  UserName: string,
  UserPassword: string,
  UserPhone: string
) => {
  return registerUserService(
    UserEmail,
    UserName,
    UserPassword,
    UserPhone,
    "ADMIN"
  );
};

export { registerUserService, loginUserService, registerAdminService };
