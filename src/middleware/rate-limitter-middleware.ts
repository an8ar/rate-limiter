import moment from "moment";
import { redisClient } from "..";
import { NextFunction, Request, Response } from "express";

const WINDOW_SIZE_IN_MINUTES = 1; // Window size for rate limiting
const MAX_WINDOW_REQUEST_COUNT = 3; // Maximum allowed requests per window

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const userId = req.user.userId.toString();
    const record = await redisClient.get(userId);
    const currentRequestTime = moment();

    if (!record) {
      let newRecord = [
        {
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        },
      ];
      await redisClient.set(
        userId,
        JSON.stringify(newRecord),
        "EX",
        WINDOW_SIZE_IN_MINUTES * 60
      );
      next();
    } else {
      let data = JSON.parse(record);
      let windowStartTimestamp = moment()
        .subtract(WINDOW_SIZE_IN_MINUTES, "minutes")
        .unix();
      let requestsWithinWindow = data.filter(
        (entry: any) => entry.requestTimeStamp > windowStartTimestamp
      );

      let totalWindowRequestsCount = requestsWithinWindow.reduce(
        (accumulator: any, entry: { requestCount: any }) =>
          accumulator + entry.requestCount,
        0
      );

      if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
        res
          .status(429)
          .json({ error: "Request limit exceeded. Try again later." });
      } else {
        data.push({
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        });
        await redisClient.set(
          userId,
          JSON.stringify(data),
          "EX",
          WINDOW_SIZE_IN_MINUTES * 60
        );
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
