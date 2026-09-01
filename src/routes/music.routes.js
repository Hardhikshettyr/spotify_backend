const express=require("express");
const musicController=require("../controllers/music.contoller");
const multer=require("multer");
const uplaod=multer({storage:multer.memoryStorage()});
const authmiddleware=require("../middlewares/auth.middleware")


const router=express.Router();

router.post("/upload",authmiddleware.authArtist,uplaod.single("music"),musicController.createmusic);
// router.post("/login",authController.loginUser);
router.post("/album",authmiddleware.authArtist,musicController.createalbum);
router.get("/",authmiddleware.authUser,musicController.getmusic);
router.get("/album",authmiddleware.authUser,musicController.getalbum);
router.get("/album/:id",authmiddleware.authUser,musicController.getalbumbyid);

module.exports=router;