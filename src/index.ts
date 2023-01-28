import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import session from "express-session";
// import compression from "compression";
// import helmet from "helmet";
import { dbconnect } from "./db";
import { logger } from "./utils";
import { accountRoutes, userRoutes } from "./routes";
import { IS_PROD, PORT } from "./constants";

const main = async () => {
  const app = express();
  /** connect postgres */
  await dbconnect();
  /* middelwares */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(helmet());
  // app.use(compression());
  /** session */
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 28800, // 28800 secs is 8 hours
      },
    })
  );
  /** api routes  */
  app.use("/api/account", accountRoutes);
  app.use("/api/user", userRoutes);
  /** listens */
  app.listen(PORT, () =>
    logger.info(`Server started and running on http://localhost:${PORT}`)
  );
};
// server call
main().catch((err) => {
  logger.error("Main server error : ", err);
});
