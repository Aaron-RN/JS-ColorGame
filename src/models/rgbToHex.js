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

export default RGBToHex;