import clsx from "clsx";

import { MatchWeight } from "@/utils/masterMindGame";

import styles from "./Match.module.scss";

const Match = ({ data }: { data: MatchWeight[] }) => {
  return (
    <ul className={styles.root}>
      {data.map((match, i) => (
        <li key={i} className={clsx(styles.dot, styles[`weight${match}`])} />
      ))}
    </ul>
  );
};

export default Match;
