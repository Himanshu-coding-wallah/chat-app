import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadToImageKit(buffer, name){
    try {
        const response = await client.files.upload({
          file: buffer,
          fileName: name,
        });
        
        // console.log(response);
        return response
    } catch (error) {
        console.log("imagkit error" ,error.message)
    }
}

export default uploadToImageKit