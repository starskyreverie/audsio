const getImageFromUrl = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });

const getBlobFromCanvas = (canvas, file) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        blob.name = file.name;
        blob.lastModified = file.lastModified;
        resolve(blob);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, file.type); //"image/jpeg");
  });

const cropImage = async (imageUrl, file, crop, w) => {
  const image = await getImageFromUrl(imageUrl),
    canvas = document.createElement("canvas"),
    scaleX = image.naturalWidth / image.width,
    scaleY = image.naturalHeight / image.height,
    ctx = canvas.getContext("2d");

  const scalingFactor = image.width / w;

  canvas.width = crop.width * scalingFactor;
  canvas.height = crop.height * scalingFactor;

  ctx.drawImage(
    image,
    crop.x * scaleX * scalingFactor,
    crop.y * scaleY * scalingFactor,
    crop.width * scaleX * scalingFactor,
    crop.height * scaleY * scalingFactor,
    0,
    0,
    crop.width * scalingFactor,
    crop.height * scalingFactor
  );

  return await getBlobFromCanvas(canvas, file);
};

export default cropImage;
