import Image from "next/image";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Hi&nbsp;
          <code className={styles.code}>Damian</code>
          &nbsp;😻
        </p>
        <div>By Sashunia</div>
      </div>

      <div className={styles.center}>
        <div
          style={{
            minWidth: "100%",
            width: "25rem",
            paddingBottom: "146%",
            position: "relative",
          }}
        >
          <Image
            className={styles.logo}
            src="./dorka.png"
            alt="Logo"
            priority
            fill
          />
        </div>
      </div>
    </main>
  );
}
