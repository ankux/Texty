import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
        expiresIn: "7d" 
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent client-side scripts from accessing the cookie
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // only send cookie over HTTPS in production
        path: "/", // make the cookie available on all routes
    });

    return token;
}