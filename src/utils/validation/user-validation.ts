import { checkSchema } from "express-validator";
import {
  getValidationParameters,
  validationParameters,
} from "./allValidationVariables";
import User from "../../Modules/user/entities/user.entity";

export const register = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "email",
        include: {
          custom: {
            options: async (value: string) => {
              const checkingEmail = await User.findOne({
                where: { email: value },
                attributes: ["email"],
              });
              if (checkingEmail) {
                throw new Error("E-Mail is already in user!!!");
              }
              return true;
            },
          },
        },
      },
      {
        type: "name",
      },
      {
        type: "password",
      },
      {
        type: "conform_password",
      },
    ],
    validationParameters
  ),
});

export const login = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "email",
      },
      {
        type: "password",
      },
    ],
    validationParameters
  ),
});

export const logout = checkSchema({
  id: {
    notEmpty: {
      errorMessage: "Id is missing!!!!",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Please provide Valid Id",
    },
  },
});

export const userUploadAvatar = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "avatar",
      },
    ],
    validationParameters
  ),
});

export const forgetPassword = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "email",
      },
    ],
    validationParameters
  ),
});
