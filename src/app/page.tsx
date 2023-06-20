import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={`${styles.description} ${styles.center}`}>
        <p>
          Marvel Project by Clément Le Bas
        </p>
      </div>

      <div className={`${styles.grid} ${styles.center}`}>
        <a
          //href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={styles.center}>
            Start <span>-&gt;</span>
          </h2>
        </a>

      </div>
    </main>
  )
}
