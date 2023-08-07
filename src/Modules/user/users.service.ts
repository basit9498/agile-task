import { UserRequestData } from "../../types/types";
import NotFoundedError from "../../utils/errors/notFoundedErrorHandler";
import { hashedPasswordMatch } from "../../utils/helpers/hashPassword";
import { UserAttributes } from "../../utils/interface/modules/user.interface";
import User from "./entities/user.entity";

class UserService {
  // User register
  async register(userData: UserAttributes): Promise<User | Error> {
    return await User.create(userData);
  }

  // user login
  async login(email: string, password: string): Promise<User | Error> {
    try {
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundedError("E-mail and Password not founded !!!!");
      }

      const passwordMatched = await hashedPasswordMatch(
        password,
        user.password
      );

      if (!passwordMatched) {
        throw new NotFoundedError("E-mail and Password not founded !!!!");
      }

      return user;
    } catch (error) {
      throw new NotFoundedError("E-mail and Password not founded !!!");
    }
  }

  // get me
  async getMe(searchBy: number | string): Promise<User | Error> {
    try {
      const condition: { id?: number; email?: string } = {};

      const getSearchAttribute = Number(searchBy);

      if (!isNaN(getSearchAttribute)) {
        condition.id = getSearchAttribute;
      } else {
        condition.email = searchBy as string;
      }

      const getUser = await User.findOne({ where: condition });
      if (!getUser) {
        throw new NotFoundedError("User not founded !!!");
      }
      return getUser;
    } catch (error) {
      throw new NotFoundedError("User not founded !!!");
    }
  }

  // reset password
  async resetPassword(id: number, password: string): Promise<User | Error> {
    try {
      const userUpdate = await User.findByPk(id);
      if (!userUpdate) {
        throw new NotFoundedError("User not founded !!!");
      }
      await userUpdate.update({ password: password });
      return userUpdate;
    } catch (error) {
      throw new Error("Password is not updated !!!");
    }
  }
}

export default UserService;
