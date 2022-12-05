const express = require("express");
const app = express();
const port = 8080;

const ejs = require("ejs");

// Errors
// const { error403, error404 } = require("./utils/render-params");
const errorJSON = require("./utils/errors/errors.json");
const { error403, error404 } = errorJSON;

// Gallery
const {
  getGalleryPhotos,
  getAnimatedGalleryPhotos,
} = require("./utils/gallery/gallery");

// Compile SASS
const sass = require("sass");
const fs = require("fs");
const bootstrap = sass.compile(__dirname + "/resources/sass/custom.scss", {
  sourceMap: true,
});
fs.writeFileSync(__dirname + "/resources/css/custom.css", bootstrap.css);
const scss = sass.compile(__dirname + "/resources/sass/styles.scss", {
  sourceMap: true,
});
fs.writeFileSync(__dirname + "/resources/css/sass-styles.css", scss.css);

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

app.get("*/animated-gallery.css", (req, res) => {
  const cssPath = __dirname + "/temp/animated-gallery.css";
  res.setHeader("Content-Type", "text/css");
  res.sendFile(cssPath);
});

app.get("/product-gallery", async (req, res) => {
  // choose random grid size
  const imageCount = [4, 9, 16];
  const count = imageCount[Math.floor(Math.random() * imageCount.length)];
  // process custom scss
  const scssText = fs
    .readFileSync(__dirname + "/resources/sass/animated-gallery.scss")
    .toString("utf-8");
  const scssRes = ejs.render(scssText, { gridSize: Math.sqrt(count) });
  const scssPath = __dirname + "/temp/animated-gallery.scss";
  fs.writeFileSync(scssPath, scssRes);
  try {
    const scssCompiled = sass.compile(scssPath);
    const cssPath = __dirname + "/temp/animated-gallery.css";
    fs.writeFileSync(cssPath, scssCompiled.css);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Eroare");
  }
  return res.render("pages/product-gallery", {
    galleryPhotos: await getGalleryPhotos(new Date().getMinutes()),
    animatedGalleryPhotos: getAnimatedGalleryPhotos(count),
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
