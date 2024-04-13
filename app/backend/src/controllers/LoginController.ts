import { Request, Response } from 'express';
import IRequestWithUser from '../Interfaces/IRequestWithUser';
import UserService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private _userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const serviceResponse = await this._userService.verifyLogin(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  static returnRole(req: IRequestWithUser, res: Response) {
    const { user } = req;

    res.status(200).json({ role: user?.role });
  }
}
