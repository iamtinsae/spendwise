import './globals.css';
import styles from './page.module.css';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import clsx from '@/lib/clsx';
import { ClientProvider } from '@/client/trpc-client';
import { getSession, SessionProvider, useSession } from 'next-auth/react';
import SignIn from '@/components/sign-in';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/server/auth';

export const metadata = {
  title: 'Spend Wise',
  description: 'Track your spending and save money',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <ClientProvider>
      <html lang="en">
        <body className={spaceGrotesk.className}>
          <main className={clsx(styles.main, spaceGrotesk.className)}>
            <Link href="/">
              <h1 className={clsx('text-4xl', styles.underlined)}>
                Spend Wise
              </h1>
            </Link>
            {session?.user ? children : <SignIn />}
          </main>
        </body>
      </html>
    </ClientProvider>
  );
}
