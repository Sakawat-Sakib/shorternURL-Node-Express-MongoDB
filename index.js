const express = require('express');
const path = require('path');
const {connectDB} = require('./connection');
const cookieParser = require('cookie-parser');

//URL Model
const URL = require('./models/url');

//Middleware Initialization
const {restricToLoggedin,checkAuth} = require('./middlewares/auth.js');

//Route Initialization
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');



const app = express();
const PORT = 8001;

//initializing templating engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


//database connection
connectDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("DB connected"));

//parsing from body
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cookieParser());

//Route
app.use('/',checkAuth,staticRoute); //view page
app.use('/user',userRoute); //for user management
app.use("/url",restricToLoggedin,urlRoute); //middleware + adding new URL

//PROBLEMATIC CODE_________________________
// app.get("/:shortId",async (req,res)=>{ //redirecting to original URL
//     const shortId = req.params.shortId;

//     const entry = await URL.findOneAndUpdate({
//         shortId
//     },{$push:{
//         visitHistory: {
//             timestamp: Date.now(),
//         },
//         },
//     });
    
//    res.redirect(entry.redirectURL);
    
// });



//Server Connection
app.listen(PORT,()=>{console.log(`Server started at PORT:${PORT}`)});