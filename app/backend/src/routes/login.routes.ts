import { Request, Response, Router } from 'express';
import IRequestWithUser from '../Interfaces/IRequestWithUser';
import LoginController from '../controllers/LoginController';
import loginValidation from '../middlewares/loginValidation';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const loginController = new LoginController();
const authMiddleware = new AuthMiddleware();

const router = Router();

router.post('/', loginValidation, (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  authMiddleware.authenticate,
  (req: Request, res: Response) => LoginController.returnRole(req as IRequestWithUser, res),
);

export default router;
