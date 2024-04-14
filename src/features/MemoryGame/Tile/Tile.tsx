import clsx from "clsx";
import { useState } from "react";

import styles from "./Tile.module.scss";

const Tile = ({ dots, backColor }: ITile & { backColor?: string }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={clsx(styles.root, isOpen && styles.open)}
      onClick={() => setOpen((open) => !open)}
    >
      <div className={styles.card}>
        <div className={styles.front}>
          <div
            className={styles.dots}
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(dots.length)}, 1fr)`,
            }}
          >
            {dots.map((color, i) => (
              <div
                key={i}
                className={styles.dot}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className={styles.back}>
          <div
            className={styles.backInner}
            style={
              backColor
                ? {
                    backgroundColor: backColor,
                  }
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Tile;
