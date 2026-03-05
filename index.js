import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
const port = process.env.PORT || 5100
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fileUpload from "express-fileupload";
import helmet from "helmet"
import mongoose from "mongoose";
import AuthUser from "./routes/AuthUser.js"
import Home from "./routes/Home.js"
mongoose.connect(process.env.MONGO_DEVT_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log("connected to database");
  });


app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

app.set('views', join(__dirname, 'views')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 app.use(fileUpload({
    useTempFiles: true
}))


app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",          
        "https://cdnjs.cloudflare.com"
      ],
      scriptSrcAttr: ["'unsafe-inline'"],  
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: ["'self'", "data:"],
                  imgSrc: [                                   
        "'self'",
        "data:",
        "https://res.cloudinary.com",              
      ],

      connectSrc: [
        "'self'",
        "https://cdnjs.cloudflare.com"   
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"
      ],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);

app.use(AuthUser)
app.use(Home)

app.listen(port, () => {
    console.log(`your server is running on port ${port}`)
})

