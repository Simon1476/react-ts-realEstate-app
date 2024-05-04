import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "",
    (error: any, data: any) => {
      if (error)
        return res.status(403).json({ message: "Token is not Valid!" });
      req.userId = data.id;
      next();
    }
  );
};
