//new
import "dotenv/config";

import express from "express";
import Lab5 from "./Lab5.js";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import QuizRoutes from "./Kanbas/quizzes/routes.js";

import mongoose from "mongoose";

import cors from "cors";
import Hello from "./Hello.js";

//new
import session from "express-session";

//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

//added this??
//DB_CONNECTION_STRING = 'mongodb+srv://lalcelikbilek:1234@cluster0.grgxgm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express();

//var cors = require('cors');
//app.use(cors());

app.use(
    cors({
      credentials: true,
      //origin: "http://localhost:3000",
      origin: process.env.FRONTEND_URL
    })
   );   
app.use(express.json());

 const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }  
  app.use(session(sessionOptions));


UserRoutes(app);
ModuleRoutes(app);

QuizRoutes(app);

CourseRoutes(app);
Hello(app);
Lab5(app);

const port = process.env.PORT || 4000;
app.listen(process.env.PORT || 4000);

