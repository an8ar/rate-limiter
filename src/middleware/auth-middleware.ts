import { NextFunction, Request, Response } from "express";
import ApiError from "../exception/apiError";
import { getSessionData } from "../redis-helper/fetch";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.sessionID;
    if (!sessionId) next(ApiError.UnauthorizedError());
    const sessionData = await getSessionData(sessionId);
    if (sessionData && sessionData.userId) {
      req.user = { sessionId, userId: sessionData.userId };
      next();
    } else {
      next(ApiError.UnauthorizedError());
    }
  } catch (error) {
    next(error);
  }
}
