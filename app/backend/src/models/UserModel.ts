import IUser from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async findByEmail(query: string): Promise<IUser | null> {
    const dbReturn = await this._model.findOne({ where: { email: query } });

    if (!dbReturn) return null;

    const { id, email, username, role, password }: IUser = dbReturn;
    return { id, email, username, role, password };
  }
}
