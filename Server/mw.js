import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const mw = (req, res, next) => {
    const token = req.headers.token;   
    if (!token) {
        return next(createError(401, "Token is missing!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token Invalid"));
        }

        req.user = user;  
        next();  
    });
};
