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