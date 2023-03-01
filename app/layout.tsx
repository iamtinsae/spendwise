import './globals.css';
import styles from './page.module.css';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import clsx from '@/lib/clsx';

export const metadata = {
  title: 'Spend Wise',
  description: 'A simple budgeting app for your personal finances',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <main className={clsx(styles.main, spaceGrotesk.className)}>
          <Link href="/">
            <h1 className={clsx('text-4xl', styles.underlined)}>Spend Wise</h1>
          </Link>
          {children}
        </main>
      </body>
    </html>
  );
}
