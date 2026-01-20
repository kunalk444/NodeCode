import { Router } from "express";
import { OAuth2Client } from "google-auth-library";

const authRouter  = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

authRouter.post("/signup",(req,res)=>{
    console.log("reached here");
    console.log(req.body);
    return res.json({ok:true});
});

authRouter.post("/googlelogin",async(req,res)=>{
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID,
    })
    const data =  ticket.getPayload();
    console.log(data);
})

export default authRouter;