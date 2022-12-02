const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const galleryJSON = require("./gallery.json");

exports.getGalleryPhotos = async (minutes) => {
  const quarter = Math.floor(minutes / 15 + 1) + "";
  const galleryPath = galleryJSON.cale_galerie;
  const photos = galleryJSON.imagini.filter((image) => {
    return image.sfert_ora === quarter;
  });
  if (photos.length > 10) {
    return photos.slice(0, 10);
  }
  const resizePhotosPromise = photos.map(async (image) => {
    const fileName = image.cale_imagine.split(".")[0];
    const filePath = path.join(galleryPath, image.cale_imagine);
    const mediumSizedFileName = fileName + "-medium.jpg";
    const mediumSizedFilePath = path.join(galleryPath, mediumSizedFileName);
    const smallSizedFileName = fileName + "-small.jpg";
    const smallSizedFilePath = path.join(galleryPath, smallSizedFileName);
    if (!fs.existsSync(mediumSizedFilePath)) {
      await sharp(filePath).resize(400).toFile(mediumSizedFilePath);
    }
    if (!fs.existsSync(smallSizedFilePath)) {
      await sharp(filePath).resize(300).toFile(smallSizedFilePath);
    }
    image.cale_imagine = path.join(galleryPath, image.cale_imagine);
    image.medium_image = path.join(galleryPath, mediumSizedFileName);
    image.small_image = path.join(galleryPath, smallSizedFileName);
  });
  await Promise.allSettled(resizePhotosPromise);
  return photos;
};
