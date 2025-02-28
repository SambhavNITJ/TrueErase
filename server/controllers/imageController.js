import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

//controller fn to remove bg

export const removeBgImage = async(req, res) => {
    try {
        console.log('inside bg remove');
        const {clerkId} = req.body;
        const user = await userModel.findOne({clerkId});
        console.log(user);
        if(!user){
            return res.json({success:false, message : 'user not found'});
        }

        if(user.creditBalance === 0){
            return res.json({success:false, message : 'no credit balance', creditBalance: user.creditBalance});
        }

        const imagePath = req.file.path;
        //read image file
        const imageFile = fs.createReadStream(imagePath);

        const formdata = new FormData();
        formdata.append('image_file', imageFile);

        const data = await axios.post(
          "https://clipdrop-api.co/remove-background/v1",
          formdata,
          {
            headers: {
              "x-api-key": process.env.CLIPDROP_API,
            },
            responseType : 'arraybuffer'
          }
        );


        const base64Image = Buffer.from(data, 'binary').toString('base64')

        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creditBalance : user.creditBalance-1});

        res.json({success:true, resultImage, creditBalance : user.creditBalance-1, message : 'background remove'});

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message});
    }
}