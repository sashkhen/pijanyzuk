import clsx from "clsx";
import { PropsWithChildren } from "react";

import styles from "./Sequence.module.scss";

export enum SequenceType {
  ORIGINAL = "original",
  ATTEMPT = "attempt",
  CURRENT = "current",
}

const Sequence = ({
  type,
  className,
  children,
}: PropsWithChildren & { type?: SequenceType; className?: string }) => {
  return (
    <ul className={clsx(styles.root, className)} data-type={type}>
      {children}
    </ul>
  );
};

export default Sequence;
