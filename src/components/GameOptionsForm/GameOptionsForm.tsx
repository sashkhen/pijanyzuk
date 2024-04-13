import { GAME_OPTIONS } from "@/consts";
import { getNumericValue } from "@/utils/base";

import styles from "./GameOptionsForm.module.scss";

const GameOptionsForm = ({
  onChange,
  ...props
}: IGameOptions & { onChange?: (values: Partial<IGameOptions>) => void }) => {
  const values = Object.assign({}, GAME_OPTIONS, props);
  const { gameSize, tileSize, colorsNumber } = values;

  return (
    <form className={styles.root}>
      <div className={styles.field}>
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
      <div className={styles.field}>
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
      <div className={styles.field}>
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

export default GameOptionsForm;
