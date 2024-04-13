import styles from "./Tile.module.scss";

const Tile = ({ dots }: { dots: string[] }) => {
  return (
    <div
      className={styles.root}
      style={{ gridTemplateColumns: `repeat(${Math.sqrt(dots.length)}, 1fr)` }}
    >
      {dots.map((color, i) => (
        <div
          key={i}
          className={styles.dot}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default Tile;
