const Express = require("express");
const app = Express();
const port = 3002;

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/:file", (req, res) => {
  const file = req.params.file;
  res.sendFile(__dirname + `/src/${file}`);
});

app.use("/favicon.ico", Express.static("src/favicon.ico"));

app.use("/src", Express.static("src"));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
