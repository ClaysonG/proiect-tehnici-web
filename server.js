const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.use("/resources", express.static("resources"));

app.all("*", (req, res, next) => {
  req.user = {};
  req.user.ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
  next();
});

app.all("*.ejs", (req, res) => {
  return res.render("pages/403");
});

app.get("/", (req, res) => {
  return res.render("pages/index", {
    home: true,
    ip: req.user.ip,
  });
});

app.get("/:page", (req, res) => {
  const fs = require("fs");
  const { page } = req.params;
  if (page === "home") {
    return res.render("pages/index", {
      home: true,
      ip: req.user.ip,
    });
  }
  if (fs.existsSync(`./views/pages/${page}.ejs`)) {
    return res.render(`pages/${page}`);
  }
  return res.status(404).render("pages/404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use((req, res) => {
  return res.status(404).render("pages/404");
});
