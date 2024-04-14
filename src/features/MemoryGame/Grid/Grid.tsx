import { useMemo } from "react";

import { getRandomIntFromInterval } from "@/utils/base";

import Tile from "../Tile";
import styles from "./Grid.module.scss";

const Grid = ({ tiles, palette }: { tiles: ITile[]; palette?: string[] }) => {
  const backColor = useMemo(() => {
    return palette?.[getRandomIntFromInterval(0, palette.length - 1)];
  }, [palette]);
  return (
    <div
      className={styles.root}
      style={{ gridTemplateColumns: `repeat(${Math.sqrt(tiles.length)}, 1fr)` }}
    >
      {tiles.map((tile, i) => (
        <Tile key={i} {...tile} backColor={backColor} />
      ))}
    </div>
  );
};

export default Grid;
