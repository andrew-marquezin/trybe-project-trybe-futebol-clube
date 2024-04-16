import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderBoardController = new LeaderboardController();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeLeaderboard(req, res),
);

export default router;
