import { NextFunction, Request, Response } from "express";
import ApiError from "../exception/apiError";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      error: true,
      data: null,
      errors: err.errors,
    });
  }
  return res
    .status(500)
    .json({
      message: "Internal server error",
      data: null,
      status: 500,
      error: true,
    });
}
