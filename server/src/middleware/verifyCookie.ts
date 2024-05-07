import { Request, Response, NextFunction } from "express";
export const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  next();
};
