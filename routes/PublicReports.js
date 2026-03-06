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

PublicReports.get('/public/show-report/:id', async(req, res) => {

try {
 const {id} = req.params

          const report =  await Report.findById(id)
        
          if(!report) {
            return res.json({msg: "Requsted report does not exists!"})
          }
     
      res.json({report})

    
} catch (error) {
    console.log(`cannot fetch report, ${error.message}`)
    return res.json({msg: `cannot fetch report, ${error.message}`})

}

})




export default PublicReports