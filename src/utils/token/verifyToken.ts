import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtData } from "./generateToken";

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | JwtData> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.AUTH_TOKEN_SECRET as jwt.Secret,
      (error, payload) => {
        if (error) {
          return reject(error);
        }
        return resolve(payload as JwtData);
      }
    );
  });
};

export const verifyForgetPasswordToken = async (
  token: string
): Promise<jwt.VerifyErrors | JwtData> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.RESET_PASSWORD_TOKEN_SECRET as jwt.Secret,
      (error, payload) => {
        if (error) {
          return reject(error);
        }
        return resolve(payload as JwtData);
      }
    );
  });
};
