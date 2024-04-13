import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private _matchService = new MatchService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (typeof (inProgress) === 'string') {
      const serviceResponse = await this._matchService.getFilteredMatches(inProgress);

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
      }
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this._matchService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }
}
