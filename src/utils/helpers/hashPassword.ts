import bcrypt from "bcryptjs";

export const hashedPasswordMatch = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
