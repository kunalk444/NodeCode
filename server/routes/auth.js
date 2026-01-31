import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { createUser, handleLogin, handleGoogleLogin } from "../controllers/user.js";
import { createJwtToken } from "../services/jwttoken.js";
import { authMiddleware } from "../services/middleware.js";

const authRouter = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

authRouter.get("/me", authMiddleware, (req, res) => {
    const user = req.user;
    return res.status(200).json({ success: true, user });
});

authRouter.post("/signup", async (req, res) => {
    try {
        const userObj = req.body;
        const ifCreated = await createUser(userObj);
        if (ifCreated.success) {
            const token = createJwtToken(ifCreated.user);

            res.cookie("jwt", token, {
                sameSite: "none",
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 1000
            })

            return res.json({ success: true, user: ifCreated.user });
        }
        return res.json({ success: false, msg: ifCreated.msg });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const user = req.body;
        const ifExist = await handleLogin(user);
        if (ifExist.success) {
            const token = createJwtToken(ifExist.user);
            res.cookie("jwt", token, {
                sameSite: "none",
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 1000
            });
        }
        return res.json(ifExist);
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

authRouter.post("/googlelogin", async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        const data = ticket.getPayload();
        const ans = await handleGoogleLogin(data.email, data.name);
        if (ans.success) {
            const token = createJwtToken(ans.user);
            res.cookie("jwt", token, {
                sameSite: "none",
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 1000
            })
        }
        return res.json(ans);
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

authRouter.post("/logout", async (req, res) => {
    try {
        res.clearCookie("jwt", {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        req.user = null;

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

export default authRouter;