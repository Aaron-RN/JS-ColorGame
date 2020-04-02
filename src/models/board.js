import colorBox from './colorBox';

class Board {
  constructor(maxColors) {
    this.colors = [];
    this.maxColors = maxColors;
    this.colorShown = false;
  }

  PopulateColors(R, G, B) {
    this.colors = [];
    let { colorShown } = this;
    const { maxColors } = this;
    let lastColor = false;

    for (let i = 1; i <= maxColors; i += 1) {
      if (i === maxColors) { lastColor = true; }
      const rand = Math.floor(Math.random() * 2);
      if ((!colorShown && rand === 1) || (!colorShown && lastColor)) {
        colorShown = true;
        this.colors.push(colorBox(i, maxColors, { R, G, B }));
      } else {
        this.colors.push(colorBox(i, maxColors));
      }
    }
  }

  retrieveColor(i) {
    const colorBox = this.colors[i];
    return { r: colorBox.r, g: colorBox.g, b: colorBox.b };
  }
}

export default Board;