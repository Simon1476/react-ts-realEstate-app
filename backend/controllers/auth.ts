import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { LoginUser, RegisterUser } from "../types/user";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = <RegisterUser>req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username }, // Check for username
          { email }, // Check for email
        ],
      },
    });

    if (existingUser) {
      // User already exists, handle the error
      return res
        .status(400)
        .json({ message: "Username or email already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user!" });
  }

  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = <LoginUser>req.body;

  try {
    // 사용자 존재 확인
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user)
      return res.status(401).json({ message: "Invalid Credentials! " });
    // 비밀번호 일치 유무 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });
    // 쿠키 토큰을 생성하여 사용자에게 전달

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
