import { Request } from 'express';
import IUser from './users/IUser';

export default interface IRequestWithUser extends Request {
  user: IUser;
}
