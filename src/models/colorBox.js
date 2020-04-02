
const colorBox = (i, maxLength, color = { R: null, G: null, B: null }) => {
  const colorObj = { id: i, r: null, g: null, b: null };
  if (color.R && color.G && color.B) {
    const { R, G, B } = color;
    colorObj.r = R;
    colorObj.g = G;
    colorObj.b = B;

    // console.log(colorObj);
    return colorObj;
  }
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  colorObj.r = r;
  colorObj.g = g;
  colorObj.b = b;

  // console.log(colorObj);
  return colorObj;
};

export default colorBox;