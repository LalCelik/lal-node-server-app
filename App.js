
import express from "express";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import QuizRoutes from "./Kanbas/quizzes/routes.js";

import cors from "cors";
import Hello from "./Hello.js";

const app = express();
app.use(express.json());
app.use(cors());


ModuleRoutes(app);

QuizRoutes(app);

CourseRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);

