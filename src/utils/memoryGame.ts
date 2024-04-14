import { v4 as uuidv4 } from "uuid";

import { MEMORY_GAME_OPTIONS, PALETTES } from "../consts";
import { getRandomIntFromInterval, shuffle } from "./base";

export const pickPalette = () => {
  return PALETTES[getRandomIntFromInterval(0, PALETTES.length - 1)];
};

export const pickColors = (palette: string[], number = 4) => {
  return Array.from(Array(number)).reduce((acc) => {
    const pool = palette.filter((color) => !acc.includes(color));
    return [...acc, pool[getRandomIntFromInterval(0, pool.length - 1)]];
  }, []);
};

export const generateDots = (size = 4, colors = PALETTES[0]) => {
  return Array.from(Array(size * size)).map(
    () => colors[getRandomIntFromInterval(0, colors.length - 1)]
  );
};

export const generateUniqueTiles = (size = 4) => {
  const count = (size * size) / 2;
  return Array.from(Array(count % 2 ? Math.floor(count) : count));
};

export const generateGame = (props?: IGameOptions & { palette?: string[] }) => {
  const {
    gameSize,
    tileSize,
    colorsNumber,
    palette: _palette,
  } = Object.assign({}, MEMORY_GAME_OPTIONS, props);

  const palette = _palette ?? pickPalette();

  const tiles: ITile[] = generateUniqueTiles(gameSize).reduce((acc) => {
    const colors = pickColors(palette, colorsNumber);
    const tile = generateDots(tileSize, colors);
    return [...acc, { id: uuidv4(), dots: tile }, { id: uuidv4(), dots: tile }];
  }, []);

  return shuffle(tiles);
};

export default generateGame;
