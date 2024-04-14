import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './SequenceItem.module.scss';

const SequenceItem = ({
  value,
  onClick,
  active,
  disabled,
  children,
}: PropsWithChildren & {
  value?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) => (
  <li
    className={clsx(
      styles.root,
      onClick && !disabled && styles.clickable,
      active && styles.active,
      disabled && styles.disabled
    )}
    style={{ backgroundColor: value }}
    onClick={disabled ? undefined : onClick}
  >
    {children}
  </li>
);

export default SequenceItem;
