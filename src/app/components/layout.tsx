import { Inter } from 'next/font/google';

import styles from '../styles/page.module.css';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={`${styles.description}`}>
        <p>Marvel Project by Clément Le Bas</p>
      </div>
      {children}
    </main>
  );
}
