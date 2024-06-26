import express from "express";
import setRouters from "./routes";
import errorHandler from "./middlewares/errors";
import "dotenv/config";
import { log } from "./utils/logger";
import cors from "cors";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
setRouters(app);
app.use(errorHandler);

app.use(errorHandler);
app.listen(PORT, () => log.info(`Server is listening on port ${PORT}...`));
