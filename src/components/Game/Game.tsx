"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { GAME_OPTIONS, PALETTES } from "@/consts";
import generateGame from "@/utils/tiles";

import GameOptionsForm from "../GameOptionsForm";
import Grid from "../Grid";
import PaletteSelector from "../PaletteSelector";
import styles from "./Game.module.scss";

const Game = () => {
  const [gameId, setGameId] = useState<string>();
  const [options, setOptions] = useState<Partial<IGameOptions>>(GAME_OPTIONS);
  const [paletteIndex, setPaletteIndex] = useState<number>();
  const tiles = useMemo(() => {
    if (!gameId) return [];

    let palette;

    if (paletteIndex !== undefined) {
      palette = PALETTES[paletteIndex];
    }

    return generateGame({ ...options, palette });
  }, [gameId, options, paletteIndex]);

  useEffect(() => {
    setGameId(uuidv4());
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <b>Meowmory</b>
        </h1>
      </div>
      <aside className={styles.sidebar}>
        <GameOptionsForm
          {...options}
          onChange={(values) => setOptions(values)}
        />
        <PaletteSelector
          value={paletteIndex}
          onChange={setPaletteIndex}
          colorsNumber={options.colorsNumber}
        />
      </aside>
      <main className={styles.content}>
        <Grid tiles={tiles} />
      </main>
    </div>
  );
};

export default Game;
