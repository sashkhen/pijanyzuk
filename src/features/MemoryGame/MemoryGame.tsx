"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { MEMORY_GAME_OPTIONS, PALETTES } from "@/consts";
import generateGame from "@/utils/memoryGame";

import GameOptionsForm from "./GameOptionsForm";
import Grid from "./Grid";
import styles from "./MemoryGame.module.scss";
import PaletteSelector from "./PaletteSelector";

const MemoryGame = () => {
  const [gameId, setGameId] = useState<string>();
  const [options, setOptions] =
    useState<Partial<IGameOptions>>(MEMORY_GAME_OPTIONS);
  const [paletteIndex, setPaletteIndex] = useState<number>();
  const palette = useMemo(() => {
    if (paletteIndex !== undefined) {
      return PALETTES[paletteIndex];
    }

    return undefined;
  }, [paletteIndex]);
  const tiles = useMemo(() => {
    if (!gameId) return [];

    return generateGame({ ...options, palette });
  }, [gameId, options, palette]);

  useEffect(() => {
    setGameId(uuidv4());
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <b>Meowmory</b> Game
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
        <Grid tiles={tiles} palette={palette} />
      </main>
    </div>
  );
};

export default MemoryGame;
