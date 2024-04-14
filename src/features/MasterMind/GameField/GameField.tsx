import { PropsWithChildren } from "react";

import styles from "./GameField.module.scss";

const Line = () => <div className={styles.line} />;

const GameField = ({ children }: PropsWithChildren) => {
  return <div className={styles.root}>{children}</div>;
};

GameField.Line = Line;

export default GameField;
