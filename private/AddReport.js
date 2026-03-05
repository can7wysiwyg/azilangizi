import express from "express"
import verify from "../middleware/verify.js"
const AddReport = express.Router() 
import Report from "../models/ReportModel.js"
import aziWare from "../middleware/aziWare.js"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

AddReport.post("/post-report", verify, aziWare,  async (req, res) => {
  try {
    if(!req.user) {
        return res.json({msg: "Access not available"})
    }
    const { title,  description, rType } = req.body;
    const rFile = req.files.rFile.tempFilePath;
   
    if (
      !title ||
            !description ||
      
      !rType ||
      !rFile
    ) {
      return res.json({
        msg: "Field cannot be empty! Please check and try again.",
      });
    }

    const uploadDoc = await new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: "raw",
      folder: "azilangizi_files",
           api_key: process.env.API_KEY,           
             api_secret: process.env.API_SECRET,    
             cloud_name: process.env.CLOUD_NAME,
             timeout: 300000 
    },
    (error, result) => {
      if (error) {return res.json({msg: error.message} ) }
      else { resolve(result); }
    }
  );

  fs.createReadStream(rFile).pipe(stream); 
});



const newR = new Report({
    title, 
    
     description, 
         rFile: uploadDoc.secure_url,
     rType,
     owner: req.user._id

})

await newR.save();
fs.unlinkSync(rFile);



res.json({message: "Successfully added new report!"})

  } catch (error) {
    console.log(`cannot add report, ${error.message}`);
    return res.json({ msg: `cannot add report, ${error.message}` });
  }
});


export default AddReport