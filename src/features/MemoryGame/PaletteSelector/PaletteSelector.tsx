import { PALETTES } from "@/consts";

import Palette from "../Palette";
import styles from "./PaletteSelector.module.scss";

const PaletteSelector = ({
  value,
  options = PALETTES,
  onChange,
  colorsNumber,
}: {
  value?: number;
  options?: string[][];
  onChange: (value?: number) => void;
  colorsNumber?: number;
}) => {
  return (
    <form className={styles.root}>
      <div className={styles.field}>
        <input
          type="radio"
          id="random"
          name="paletteIndex"
          checked={value === undefined}
          onChange={() => onChange()}
        />
        <label htmlFor="random">Random palette</label>
      </div>
      {options.map((palette, i) => {
        const disabled = colorsNumber ? palette.length < colorsNumber : false;

        return (
          <div key={i} className={styles.field}>
            <input
              type="radio"
              id={`paletteIndex-${i}`}
              name="paletteIndex"
              value={i}
              checked={i === value}
              onChange={() => onChange(i)}
              // disabled={disabled}
              data-disabled={disabled}
            />
            <label htmlFor={`paletteIndex-${i}`}>
              <Palette colors={palette} />
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default PaletteSelector;
