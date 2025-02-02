import { NextFunction, Request, Response } from 'express';
import { emailSchema, passwordSchema } from './schemas/loginSchema';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const { error: emailError } = emailSchema.validate(email);
  const { error: passwordError } = passwordSchema.validate(password);
  if (emailError || passwordError) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
