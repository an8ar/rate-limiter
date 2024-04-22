import { Session } from "express-session";
import { redisClient } from "../index";

export async function getSessionData(
  sessionId: string
): Promise<Session | any> {
  try {
    const sessionKey = `sess:${sessionId}`;
    const sessionData = await redisClient.get(sessionKey);
    if (sessionData) {
      return JSON.parse(sessionData);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve session from Redis:", error);
    throw error;
  }
}

export async function setSessionData(
  sessionId: string,
  data: any
): Promise<void> {
  try {
    const sessionKey = `sess:${sessionId}`;
    const sessionValue = JSON.stringify(data);
    await redisClient.set(sessionKey, sessionValue, "EX", 1800);
  } catch (error) {
    console.error("Failed to set session data in Redis:", error);
    throw error;
  }
}
