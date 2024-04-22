import express, { Request, Response } from "express";
import indexRouter from "./router/index.router";
import session, { Session } from "express-session";
import RedisStore from "connect-redis";
import IORedis from "ioredis";
import errorMiddleware from "./middleware/error-middleware";
import responseFormatMiddleware from "./middleware/response-format-middleware";

export const redisClient = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);

const app = express();
app.use(
  session({
    secret: "ansar",
    resave: false,
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1800000,
    },
  })
);
app.use(express.json());

app.use(indexRouter);
app.use(responseFormatMiddleware);

const port = process.env.PORT || 3000;

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
