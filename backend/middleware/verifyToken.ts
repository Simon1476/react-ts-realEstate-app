import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY || "", (error, data) => {
    if (error) return res.status(403).json({ message: "Token is not Valid!" });

    const decodedToken = data as { userId: string };
    req.userId = decodedToken.userId;

    next();
  });

  res.status(200).json({ message: "You are authenticated!" });
};
