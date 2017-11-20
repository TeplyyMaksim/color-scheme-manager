export default (image) => {
  const canvas = document.createElement("canvas"),
    imageWidth = image.width,
    imageHeight = image.height;
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  canvas.setAttribute('id', image.id);
  canvas.getContext("2d").drawImage(image, 0, 0, imageWidth, imageHeight);

  return canvas;
}
