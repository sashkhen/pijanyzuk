interface IGameOptions {
  gameSize?: number;
  tileSize?: number;
  colorsNumber?: number;
}

interface ITile {
  id: string;
  dots: string[];
}
