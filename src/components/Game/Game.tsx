"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { GAME_OPTIONS, PALETTES } from "@/consts";
import generateGame from "@/utils/tiles";

import Grid from "../Grid";
import Palette from "../Palette";
import styles from "./Game.module.scss";

const getNumericValue = (value: string) => {
  const num = parseInt(value, 10);
  return isNaN(num) ? undefined : num;
};

const OptionsForm = ({
  onChange,
  ...props
}: IGameOptions & { onChange?: (values: Partial<IGameOptions>) => void }) => {
  const values = Object.assign({}, GAME_OPTIONS, props);
  const { gameSize, tileSize, colorsNumber } = values;

  return (
    <form>
      <div className="field">
        <label htmlFor="gameSize">Game size</label>
        <input
          type="number"
          id="gameSize"
          name="gameSize"
          value={gameSize || ""}
          onChange={(e) =>
            onChange?.({ ...values, gameSize: getNumericValue(e.target.value) })
          }
        />
      </div>
      <div className="field">
        <label htmlFor="tileSize">Tile size</label>
        <input
          type="number"
          id="tileSize"
          name="tileSize"
          value={tileSize || ""}
          onChange={(e) =>
            onChange?.({ ...values, tileSize: getNumericValue(e.target.value) })
          }
        />
      </div>
      <div className="field">
        <label htmlFor="colorsNumber">Colors number</label>
        <input
          type="number"
          id="colorsNumber"
          name="colorsNumber"
          value={colorsNumber || ""}
          onChange={(e) =>
            onChange?.({
              ...values,
              colorsNumber: getNumericValue(e.target.value),
            })
          }
        />
      </div>
    </form>
  );
};

const Game = () => {
  const [gameId, setGameId] = useState<string>();
  const [options, setOptions] = useState<Partial<IGameOptions>>(GAME_OPTIONS);
  const tiles = useMemo(() => {
    if (!gameId) return [];

    return generateGame(options);
  }, [gameId, options]);

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
        <button onClick={() => setGameId(uuidv4())}>generate</button>

        {PALETTES.map((palette, i) => (
          <Palette key={i} colors={palette} />
        ))}
        <OptionsForm {...options} onChange={(values) => setOptions(values)} />
      </aside>
      <main className={styles.content}>
        <Grid tiles={tiles} />
      </main>
    </div>
  );
};

export default Game;
