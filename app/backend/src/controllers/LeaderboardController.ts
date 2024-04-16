import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) { }

  async getHomeLeaderboard(_req: Request, res: Response) {
    const board = await this._leaderboardService.homeLeaderboard();
    res.status(200).json(board);
  }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const board = await this._leaderboardService.awayLeaderboard();
    res.status(200).json(board);
  }
}
