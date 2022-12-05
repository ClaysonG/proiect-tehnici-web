const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const galleryJSON = require("./gallery.json");
const e = require("express");

exports.getGalleryPhotos = async (minutes) => {
  const quarter = Math.floor(minutes / 15 + 1) + "";
  const galleryPath = galleryJSON.cale_galerie;
  let photos = galleryJSON.imagini.filter((image) => {
    return image.sfert_ora === quarter;
  });
  if (photos.length > 10) {
    return photos.slice(0, 10);
  }
  // copy array of objects
  photos = JSON.parse(JSON.stringify(photos));
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

exports.getAnimatedGalleryPhotos = (imageCount) => {
  const galleryPath = galleryJSON.cale_galerie;
  const photos = galleryJSON.imagini.filter((image) => {
    return image.titlu.length < 12;
  });
  const selectedPhotos = [];
  while (selectedPhotos.length !== imageCount) {
    // copy object
    const image = Object.assign(
      {},
      photos[Math.floor(Math.random() * photos.length)]
    );
    if (!selectedPhotos.find((img) => img.titlu === image.titlu)) {
      const fileName = image.cale_imagine.split(".")[0];
      const mediumSizedFileName = fileName + "-medium.jpg";
      const smallSizedFileName = fileName + "-small.jpg";
      image.cale_imagine = path.join(galleryPath, image.cale_imagine);
      image.medium_image = path.join(galleryPath, mediumSizedFileName);
      image.small_image = path.join(galleryPath, smallSizedFileName);
      selectedPhotos.push(image);
    }
  }
  return selectedPhotos;
};
