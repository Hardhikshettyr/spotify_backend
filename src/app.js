const express=require("express");
const cookieparser=require("cookie-parser");

const authroutes=require("./routes/auth.routes")
const musicroutes=require("./routes/music.routes")

const app=express();


app.use(express.json());
app.use(cookieparser());
app.use("/api/auth",authroutes);
app.use("/api/music",musicroutes);

module.exports=app;