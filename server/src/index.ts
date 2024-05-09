import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import auth from "./routes/auth";
import user from "./routes/user";
import recipe from "./routes/recipe";
import ingredients from "./routes/ingredients";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v1", user);
app.use("/api/v1", ingredients);
app.use("/api/v1", recipe);

const PORT = process.env.PORT as string;
app.listen(4200, "192.168.0.108", () => {
  console.log(`Listening to port ${PORT}`);
});

export default app;
