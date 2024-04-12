import * as bcrypt from 'bcryptjs';
import IToken from '../Interfaces/users/IToken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import ILogin from '../Interfaces/users/ILogin';
import UserModel from '../models/UserModel';
import jwtUtil from '../utils/jwt.util';

export default class UserService {
  constructor(
    private _UserModel: IUserModel = new UserModel(),
  ) { }

  async verifyLogin(login: ILogin): Promise<ServiceResponse<IToken>> {
    const foundUser = await this._UserModel.findByEmail(login.email);

    if (!foundUser || !bcrypt.compareSync(login.password, foundUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, email } = foundUser;
    const token = jwtUtil.sign({ id, email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
