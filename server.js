const express = require("express");
const app = express();
const port = 8080;

const ejs = require("ejs");
const url = require("url");

// Errors
// const { error403, error404 } = require("./utils/render-params");
const errorJSON = require("./utils/errors/errors.json");
const { error403, error404, error500 } = errorJSON;

// Gallery
const {
  getGalleryPhotos,
  getAnimatedGalleryPhotos,
} = require("./utils/gallery/gallery");

// Date
const { convertDate } = require("./utils/date/date");

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

// Postgres
const { Client } = require("pg");
const client = new Client({
  database: "anunturi_auto",
  user: "anunturi_auto",
  password: "anunturi_auto",
  host: "localhost",
  port: 5432,
});
client.connect();

// Get categories from ENUM
let categories = [];
client.query("SELECT DISTINCT category FROM products", (err, res) => {
  if (err) {
    return ejs.render("pages/error", error500);
  }
  const queryResults = res.rows;
  queryResults.forEach((row) => {
    categories.push(row.category);
  });
  categories = categories.sort();
});

app.set("view engine", "ejs");

app.use("/resources", express.static("resources"));

app.all("*", (req, res, next) => {
  req.user = {};
  req.user.ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
  next();
});

app.all("*.ejs", (req, res) => {
  return res.status(403).render("pages/error", {
    ...error403,
    categories,
  });
});

app.get(["/", "/home", "/index"], async (req, res) => {
  return res.status(200).render("pages/index", {
    home: true,
    ip: req.user.ip,
    galleryPhotos: await getGalleryPhotos(new Date().getMinutes()),
    categories,
  });
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productQuery = await client.query(
      `SELECT products.id, products.name, products.description, 
      products.image, products.category, makes.name AS make, 
      models.name AS model, body_types.name AS body_type, 
      products.engine_power, products.mileage, products.year, 
      fuel_types.name AS fuel_type, gearbox_types.name AS gearbox_type,
      transmission_types.name AS transmission_type,
      products.cilindrical_capacity, colors.name AS color,
      products.features, products.price, products.is_second_hand,
      products.created_at
      FROM products
      INNER JOIN makes ON products.make_id=makes.id
      INNER JOIN models ON products.model_id=models.id
      INNER JOIN body_types ON products.body_type_id=body_types.id
      INNER JOIN fuel_types ON products.fuel_type_id=fuel_types.id
      INNER JOIN gearbox_types ON products.gearbox_type_id=gearbox_types.id
      INNER JOIN transmission_types ON products.transmission_type_id=transmission_types.id
      INNER JOIN colors ON products.color_id=colors.id
      WHERE products.id=${id}
      ORDER BY products.id DESC`
    );
    const product = productQuery.rows[0];
    product.price = product.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    product.mileage = product.mileage.replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1."
    );
    product.cilindrical_capacity = product.cilindrical_capacity.replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1."
    );
    if (product.features) {
      product.features = product.features.replace(/,/g, " | ");
    }
    product.created_at = convertDate(product.created_at);
    const productName = product.name;
    return res
      .status(200)
      .render("pages/product", { categories, product, title: productName });
  } catch (error) {
    console.log(error);
    return res.status(500).render("pages/error", { ...error500, categories });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = [];
    let category = url.parse(req.url, true).query.category;
    const productsQuery = await client.query(
      `SELECT products.id, products.name, products.description, 
      products.image, products.category, makes.name AS make, 
      models.name AS model, body_types.name AS body_type, 
      products.engine_power, products.mileage, products.year, 
      fuel_types.name AS fuel_type, gearbox_types.name AS gearbox_type,
      transmission_types.name AS transmission_type,
      products.cilindrical_capacity, colors.name AS color,
      products.features, products.price, products.is_second_hand,
      products.created_at
      FROM products
      INNER JOIN makes ON products.make_id=makes.id
      INNER JOIN models ON products.model_id=models.id
      INNER JOIN body_types ON products.body_type_id=body_types.id
      INNER JOIN fuel_types ON products.fuel_type_id=fuel_types.id
      INNER JOIN gearbox_types ON products.gearbox_type_id=gearbox_types.id
      INNER JOIN transmission_types ON products.transmission_type_id=transmission_types.id
      INNER JOIN colors ON products.color_id=colors.id
      WHERE is_sold=false
      ${category ? "AND products.category=" + `'${category}'` : ""}
      ORDER BY products.id DESC`
    );
    productsQuery.rows.forEach((row) => {
      const data = Object.assign({}, row);
      data.price = row.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      data.mileage = row.mileage.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      if (data.features) {
        data.features = row.features.replace(/,/g, " | ");
      }
      data.created_at = convertDate(row.created_at);
      products.push(data);
    });
    if (category === undefined) {
      category = "autovehicule";
    }
    return res
      .status(200)
      .render("pages/products", { categories, products, heading: category });
  } catch (error) {
    console.log(error);
    return res.status(500).render("pages/error", { ...error500, categories });
  }
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
    return res.status(500).render("pages/error", { ...error500, categories });
  }
  return res.status(200).render("pages/product-gallery", {
    galleryPhotos: await getGalleryPhotos(new Date().getMinutes()),
    animatedGalleryPhotos: getAnimatedGalleryPhotos(count),
    categories,
  });
});

app.get("/:page", (req, res) => {
  const fs = require("fs");
  const { page } = req.params;

  if (fs.existsSync(`./views/pages/${page}.ejs`)) {
    return res.status(200).render(`pages/${page}`, { categories });
  }
  return res.status(404).render("pages/error", { ...error404, categories });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use((req, res) => {
  return res.status(404).render("pages/error", { ...error404, categories });
});
