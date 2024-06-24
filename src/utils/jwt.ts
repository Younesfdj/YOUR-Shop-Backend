import * as jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Generates a JSON Web Token (JWT) with the provided payload.
 * @param payload - The payload to be included in the JWT.
 * @returns The generated JWT.
 */
export const generateToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};

/**
 * Verifies the authenticity of a JSON Web Token (JWT).
 * @param token - The JWT to be verified.
 * @returns The decoded payload of the JWT.
 */
export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded as JwtPayload;
};
