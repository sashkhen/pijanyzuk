import { GAME_OPTIONS, PALETTES } from "../consts";
import { randomIntFromInterval, shuffle } from "./base";

export const pickPalette = () => {
  return PALETTES[randomIntFromInterval(0, PALETTES.length - 1)];
};

export const pickColors = (palette: string[], number = 4) => {
  return Array.from(Array(number)).reduce((acc) => {
    const pool = palette.filter((color) => !acc.includes(color));
    return [...acc, pool[randomIntFromInterval(0, pool.length - 1)]];
  }, []);
};

export const generateDots = (size = 4, colors = PALETTES[0]) => {
  return Array.from(Array(size * size)).map(
    () => colors[randomIntFromInterval(0, colors.length - 1)]
  );
};

export const generateUniqueTiles = (size = 4) => {
  const count = (size * size) / 2;
  return Array.from(Array(count % 2 ? Math.floor(count) : count));
};

export const generateGame = (props?: IGameOptions) => {
  const { gameSize, tileSize, colorsNumber } = Object.assign(
    {},
    GAME_OPTIONS,
    props
  );

  const palette = pickPalette();

  const tiles: string[][] = generateUniqueTiles(gameSize).reduce((acc) => {
    const colors = pickColors(palette, colorsNumber);
    const tile = generateDots(tileSize, colors);
    return [...acc, tile, tile];
  }, []);

  return shuffle(tiles);
};

export default generateGame;
