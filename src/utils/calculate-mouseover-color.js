import calculateCmyk from '../utils/calculate-cmyk';

export default ({ event, scheme, canvas }) => {
  const ctx = canvas.getContext("2d"),
    rect = canvas.getBoundingClientRect(),
    xCoord = event.clientX - rect.left,
    yCoord = event.clientY - rect.top,
    colorData = ctx.getImageData(xCoord, yCoord, 1, 1).data,
    r = colorData[0],
    g = colorData[1],
    b = colorData[2],
    rgb = `rgb(${r}, ${g}, ${b})`,
    cmykData = calculateCmyk(r, g, b),
    c = cmykData[0],
    m = cmykData[1],
    y = cmykData[2],
    k = cmykData[3],
    cmyk = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

  return {
    r, g, b,
    c, m, y, k,
    rgb,
    label: scheme === 'rgb' ? rgb : cmyk
  };
}
