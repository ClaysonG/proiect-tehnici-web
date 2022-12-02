const express = require("express");
const app = express();
const port = 8080;

// Errors
// const { error403, error404 } = require("./utils/render-params");
const errorJSON = require("./utils/errors/errors.json");
const { error403, error404 } = errorJSON;

// Gallery
const { getGalleryPhotos } = require("./utils/gallery/gallery");

// Compile SASS
const sass = require("sass");
const fs = require("fs");
const bootstrap = sass.compile(__dirname + "/resources/sass/custom.scss", {
  sourceMap: true,
});
fs.writeFileSync(__dirname + "/resources/css/custom.css", bootstrap.css);

app.set("view engine", "ejs");

app.use("/resources", express.static("resources"));

app.all("*", (req, res, next) => {
  req.user = {};
  req.user.ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
  next();
});

app.all("*.ejs", (req, res) => {
  return res.render("pages/error", error403);
});

app.get(["/", "/home", "/index"], async (req, res) => {
  return res.render("pages/index", {
    home: true,
    ip: req.user.ip,
    galleryPhotos: await getGalleryPhotos(new Date().getMinutes()),
  });
});

app.get("/product-gallery", async (req, res) => {
  return res.render("pages/product-gallery", {
    galleryPhotos: await getGalleryPhotos(new Date().getMinutes()),
  });
});

app.get("/:page", (req, res) => {
  const fs = require("fs");
  const { page } = req.params;

  if (fs.existsSync(`./views/pages/${page}.ejs`)) {
    return res.render(`pages/${page}`);
  }
  return res.status(404).render("pages/error", error404);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use((req, res) => {
  return res.status(404).render("pages/error", error404);
});
