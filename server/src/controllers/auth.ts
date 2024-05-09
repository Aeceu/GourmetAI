import { Request, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import prisma from "../utils/prisma";
import exclude from "../utils/exclude";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL!,
    pass: process.env.AUTH_PASS!,
  },
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) return res.status(400).json("User does not exists!");

    const validPass = await bcrypt.compare(password, userExists.password);

    if (!validPass) return res.status(400).json("Valid incorrect!");

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOption = {
      from: process.env.AUTH_EMAIL!,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup</p><p> This code <b>expires in 1 hour</b>.</p>`,
    };

    const hashOTP = await bcrypt.hash(otp, 10);

    await prisma.otp.create({
      data: {
        userId: userExists.id,
        otp: hashOTP,
        createdAt: new Date().toISOString(),
        expiredAt: calculateExpirationDate(),
      },
    });
    await transporter.sendMail(mailOption);
    res.status(200).json({
      status: "PENDING",
      message: "Verification otp email sent",
      id: userExists.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) return res.status(400).json("Email already exists!");

    const hashPass = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashPass,
      },
    });
    res.status(200).json("New user created!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;
    if (!otp || !userId)
      return res.status(400).json("Please input the otp code!");

    const otpRecord = await prisma.otp.findMany({
      where: {
        userId: userId,
      },
    });

    if (otpRecord.length <= 0) {
      return res
        .status(403)
        .json(
          "Account record doesn't exist or has been verified already. Please sign up or login"
        );
    }

    const { expiredAt } = otpRecord[0];
    const hashOTP = otpRecord[0].otp;
    const now = new Date();
    const expirationDate = new Date(now.getTime());
    if (expiredAt < expirationDate.toISOString()) {
      await prisma.otp.deleteMany({ where: { userId: userId } });
      return res.status(403).json("Code has expired. Please request again");
    }

    const validOTP = await bcrypt.compare(otp, hashOTP);

    if (!validOTP)
      return res
        .status(403)
        .json("Invalid code. Please check your inbox again");

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(403).json("User does not exists!");

    const userWithoutPass = exclude(user, ["password"]);

    await prisma.otp.deleteMany({
      where: {
        userId,
      },
    });

    res
      .status(200)
      .json({ message: "User authenticated!", user: userWithoutPass });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const calculateExpirationDate = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 60 * 60 * 1000);
  return expirationDate.toISOString();
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      console.log(user);
      const userWithoutPass = exclude(user, ["password"]);
      return res.status(200).json(userWithoutPass);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
