const musicmodel=require("../models/music.model");
const albummodel=require("../models/album.model")
const uploadfile=require("../services/storage.services")

async function createmusic(req,res){
    const title=req.body.title;
    const file=req.file;

    const result=await uploadfile(file.buffer.toString("base64"));
    const music=await musicmodel.create({
        url:result.url,
        title,
        artist:req.user.id
    })
    res.status(201).json({
        message:"Music created",
        music:{
            id:music.id,
            url:music.url,
            title:music.title,
            artist:music.artist
        }
    })
}
async function createalbum(req,res){
    const{title,musics}=req.body
    const album=await albummodel.create({
        title,
        musics,
        artist:req.user.id
    })
     res.status(201).json({
        message:"Music created",
        album:{
            id:album.id,
            musics:album.musics,
            title:album.title,
            artist:album.artist
        }
    })
}

module.exports={createmusic,createalbum};
