import jwt from "jsonwebtoken";

export interface JwtData {
  id: number;
  name: string;
  email: string;
}

export const generateToken = (data: JwtData): string => {
  const token = jwt.sign(
    { ...data },
    process.env.AUTH_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.AUTH_TOKEN_EXPIRE,
    }
  );
  return token;
};

export const generateResetPasswordToken = (data: JwtData): string => {
  const token = jwt.sign(
    { ...data },
    process.env.RESET_PASSWORD_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRE,
    }
  );
  return token;
};
