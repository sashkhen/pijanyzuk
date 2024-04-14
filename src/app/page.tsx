import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <Link href="memory-game">Meowmory Game</Link>
        </p>
        <p>
          <Link href="master-mind">MeowsterMind Game</Link>
        </p>
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
            src="/dorka.png"
            alt="Logo"
            priority
            fill
          />
        </div>
      </div>
    </main>
  );
}
