import IUser from './IUser';

export interface IUserModel {
  findOne(): Promise<IUser>,
}
