const ImageKit=require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], 
});

async function uploadfile(file){
    const result=await client.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"music"
    })
    return result;
}

module.exports=uploadfile;