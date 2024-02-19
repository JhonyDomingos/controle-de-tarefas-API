import "express-async-errors";
import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";
import { routes } from "./routes/index.routes";
import { handleErros } from "./middlewares/HandleErros.middleware";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/", routes);

app.use(handleErros);
 