import express, { Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import auth from "./routes/auth";
import ingredients from "./routes/ingredients";

import { verifyCookie } from "./middleware/verifyCookie";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v1", ingredients);

app.use(verifyCookie);

const PORT = process.env.PORT as string;
app.listen(4200, "192.168.0.108", () => {
  console.log(`Listening to port ${PORT}`);
});
