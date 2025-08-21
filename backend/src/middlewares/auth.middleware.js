import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };


