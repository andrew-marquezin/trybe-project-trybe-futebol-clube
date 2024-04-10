import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private _teamService = new TeamService(),
  ) { }

  async findAll(_req: Request, res: Response) {
    const serviceResponse = await this._teamService.findAll();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
