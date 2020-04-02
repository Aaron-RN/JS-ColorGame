
function RGBToHex(r, g, b) {
  const hex1 = Math.floor(r / 16);
  const hex2 = ((r / 16) - hex1) * 16;
  const hex3 = Math.floor(g / 16);
  const hex4 = ((g / 16) - hex3) * 16;
  const hex5 = Math.floor(b / 16);
  const hex6 = ((b / 16) - hex5) * 16;
  let hexString = `#${hex1} ${hex2} ${hex3} ${hex4} ${hex5} ${hex6}`;

  hexString = hexString.replace(/10/g, 'A');
  hexString = hexString.replace(/11/g, 'B');
  hexString = hexString.replace(/12/g, 'C');
  hexString = hexString.replace(/13/g, 'D');
  hexString = hexString.replace(/14/g, 'E');
  hexString = hexString.replace(/15/g, 'F');
  hexString = hexString.replace(/\s/g, '');

  return hexString;
}

const colorBox = (i, maxLength, color = { R: null, G: null, B: null }) => {
  const colorObj = { id: i, r: null, g: null, b: null, hex: null };
  if (color.R && color.G && color.B) {
    const { R, G, B } = color;
    colorObj.r = R;
    colorObj.g = G;
    colorObj.b = B;
    colorObj.hex = RGBToHex(R, G, B);

    // console.log(colorObj);
    return colorObj;
  }
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  colorObj.r = r;
  colorObj.g = g;
  colorObj.b = b;
  colorObj.hex = RGBToHex(r, g, b);

  // console.log(colorObj);
  return colorObj;
};

export default colorBox;