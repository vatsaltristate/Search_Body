const express = require("express");
const app = express();
const userRouter = require("./router/router");
const port = 2000;

app.use(express.json());

app.use("/api/search", userRouter);

app.get("/", (req, res) => {
  res.json({
    message:
      "Searching Project"
  });
});

app.listen(port, () => {
  console.log("Port is listing :", port);
});
