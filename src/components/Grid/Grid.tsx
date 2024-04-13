import Tile from "../Tile";
import styles from "./Grid.module.scss";

const Grid = ({ tiles }: { tiles: string[][] }) => {
  return (
    <div
      className={styles.root}
      style={{ gridTemplateColumns: `repeat(${Math.sqrt(tiles.length)}, 1fr)` }}
    >
      {tiles.map((tile, i) => (
        <Tile key={i} dots={tile} />
      ))}
    </div>
  );
};

export default Grid;
