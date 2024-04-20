import db from "../Database/index.js";

function QuizRoutes(app) {
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex(
            (q) => q._id === qid);
        db.quizzes[quizIndex] = {
            ...db.quizzes[quizIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.send(newQuiz);
    });

    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes
            .filter((q) => q.course === cid);
        res.send(quizzes);
    });

    //get only quiz based on quiz id
    app.get("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quiz = Database.quizzes
          .find((q) => q._id === qid);
        if (!quiz) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(quiz);
      });

      app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        Database.quizzes = Database.quizzes
          .filter((q) => q._id !== qid);
        res.sendStatus(204);
      });    
    
    app.post("/api/quizzes", (req, res) => {
        const quiz = { ...req.body,
          _id: new Date().getTime().toString() };
        Database.quizzes.push(quiz);
        res.send(quiz);
      });
    
  app.get("/api/quizzes", (req, res) => {
    const quizzes = Database.quizzes;
    res.send(quizzes);
  });
}
export default QuizRoutes;