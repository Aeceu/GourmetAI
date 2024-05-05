import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT as string;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
