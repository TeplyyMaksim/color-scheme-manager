import { hslToRgb } from './hsl-manager';

export default ({ canvas, yellows, light }) => {
  const ctx = canvas.getContext("2d"),
    lightening = light / 100;

  yellows.forEach(el => {
    let { h, s, l } = el;

    l += lightening;

    if (l > 1) {
      l = 1;
    } else if (l < 0) {
      l = 0;
    }

    const [r, g, b] = hslToRgb(h, s, l);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(el.x, el.y, 1, 1);
  });
}
