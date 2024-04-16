import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) { }

  async getHomeLeaderboard(_req: Request, res: Response) {
    const board = await this._leaderboardService.leaderboard();
    res.status(200).json(board);
  }
}
