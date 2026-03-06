// website pages
import express from "express";
const Home = express.Router()
import Report from "../models/ReportModel.js" 
   

Home.get('/', async(req, res) => {
    let msg;
try {

    res.render('index', {msg})
    
} catch (error) {
    console.log(`failure to load home page, ${error.message}`)

    return res.render('index', {msg: `failure to load home page, ${error.message}` })
}


})


Home.get('/login', async(req, res) => {

    let msg;
try {

    res.render('login', {msg})
    
} catch (error) {
    console.log(`failure to load login page, ${error.message}`)

    return res.render('login', {msg: `failure to load login page, ${error.message}` })
}



})


Home.get('/register', async(req, res) => {

    let msg;
try {

    res.render('register', {msg})
    
} catch (error) {
    console.log(`failure to load register page, ${error.message}`)

    return res.render('register', {msg: `failure to load register page, ${error.message}` })
}



})


Home.get('/addreport', async(req, res) => {

    let msg;
try {

    res.render('addreport', {msg})
    
} catch (error) {
    console.log(`failure to load addreport page, ${error.message}`)

    return res.render('addreport', {msg: `failure to load addreport page, ${error.message}` })
}



})


Home.get('/dashboardala', async(req, res) => {

    let msg;
try {

    res.render('dashboardala', {msg})
    
} catch (error) {
    console.log(`failure to load dashboardala page, ${error.message}`)

    return res.render('dashboardala', {msg: `failure to load dashboardala page, ${error.message}` })
}



})


Home.get('/managereport', async(req, res) => {

    let msg;
try {

    res.render('managereport', {msg})
    
} catch (error) {
    console.log(`failure to load managereport page, ${error.message}`)

    return res.render('managereport', {msg: `failure to load managereport page, ${error.message}` })
}



})



Home.get('/reports', async(req, res) => {

    let msg;
    let repoDocs;
try {
        let { rType = "all", page = 1, limit = 20 } = req.query;
           let filter = {}
            page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
      
    if (rType && rType !== "all") {
    filter.rType = rType;
}


     const reports = await Report.find(filter).skip(skip).limit(limit);
     if(!reports || reports.length === 0) {
        return res.render('reports', {repoDocs, msg: "There are no reports at the moment" })

     }
     const totalDocs = await Report.countDocuments(filter) 


    repoDocs = {
      reports,
      total: totalDocs,
      page,
      totalPages: Math.ceil(totalDocs / limit),
    }



    res.render('reports', {repoDocs, msg})
    
} catch (error) {
    console.log(`failure to load addreport page, ${error.message}`)

    return res.render('addreport',  {repoDocs,  msg: `failure to load addreport page, ${error.message}` })
}



})






export default Home