import styles from "./Palette.module.scss";

const Palette = ({ colors }: { colors: string[] }) => {
  return (
    <div className={styles.root}>
      {colors.map((color) => (
        <div
          key={color}
          className={styles.color}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default Palette;
