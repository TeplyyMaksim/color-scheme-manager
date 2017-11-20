import { rgbToHsl } from './hsl-manager';

export default (canvas) => {
  const yellows = new Promise(function(resolve, reject) {
    const yellows = [],
      ctx = canvas.getContext("2d"),
      width = canvas.width,
      height = canvas.height;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const colorData = ctx.getImageData(i, j, 1, 1).data,
        r = colorData[0],
        g = colorData[1],
        b = colorData[2],
        [h, s, l] = rgbToHsl(r, g, b);

        if (h >= 0.1027 && h <= 0.194) {
          yellows.push({ x: i, y: j ,r ,g ,b ,h ,s ,l });
        }
      }
    }

    resolve(yellows);
  });

  return yellows;
}
