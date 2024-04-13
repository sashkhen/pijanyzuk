import Tile from "../Tile";
import styles from "./Grid.module.scss";

const Grid = ({ tiles }: { tiles: ITile[] }) => {
  return (
    <div
      className={styles.root}
      style={{ gridTemplateColumns: `repeat(${Math.sqrt(tiles.length)}, 1fr)` }}
    >
      {tiles.map((tile, i) => (
        <Tile key={i} dots={tile.dots} />
      ))}
    </div>
  );
};

export default Grid;
