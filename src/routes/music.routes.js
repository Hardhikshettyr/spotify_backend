const express=require("express");
const musicController=require("../controllers/music.contoller");
const multer=require("multer");
const uplaod=multer({storage:multer.memoryStorage()});
const authmiddleware=require("../middlewares/auth.middleware")


const router=express.Router();

router.post("/upload",authmiddleware.authArtist,uplaod.single("music"),musicController.createmusic);
// router.post("/login",authController.loginUser);
router.post("/album",authmiddleware.authArtist,musicController.createalbum);

module.exports=router;