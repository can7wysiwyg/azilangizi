// website pages
import express from "express";
const Home = express.Router()
   

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





export default Home