import { Request, Response, Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  authMiddleware.authenticate,
  (req: Request, res: Response) => matchController.endMatch(req, res),
);

export default router;
