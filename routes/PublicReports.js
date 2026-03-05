import express from "express"
const PublicReports = express.Router() 
import Report from "../models/ReportModel.js" 

PublicReports.get('/public/show-report-enum', async(req, res) => {

try {
          const repoType = Report.schema.path('rType').options.enum
       
     
      res.json({repoType})

    
} catch (error) {
    console.log(`cannot fetch enums, ${error.message}`)
    return res.json({msg: `cannot fetch enums, ${error.message}`})

}

})



export default PublicReports