import { Request, Response, NextFunction } from "express";

export default function responseFormatMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.locals.response) {
    const { data, message, statusCode } = res.locals.response;
    res.status(statusCode).json({
      error: false,
      message,
      data,
    });
  } else {
    next();
  }
}
