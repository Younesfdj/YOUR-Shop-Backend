import { hashSync, compareSync } from "bcryptjs";

/**
 * Hashes the given password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

/**
 * Compares the given password with a hashed password using bcrypt.
 * @param password - The password to be compared.
 * @param hashedPassword - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
const comparePassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};

export { hashPassword, comparePassword };
