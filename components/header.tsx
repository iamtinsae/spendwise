'use client';

import clsx from '@/lib/clsx';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/', label: '~/home' },
  { href: '/categories', label: '~/categories' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mt-6 flex flex-col gap-x-5 gap-y-2 sm:flex-row sm:gap-y-0">
      {navigation.map((nav) => (
        <Link
          key={nav.href}
          href={nav.href}
          className={clsx(
            'flex items-center justify-center rounded bg-white/10 px-4 py-2',
            pathname === nav.href && 'bg-white/20'
          )}
        >
          {nav.label}
        </Link>
      ))}
      <button
        className="flex items-center justify-center rounded bg-white/10 px-4 py-2"
        onClick={async () => {
          await signOut({ redirect: false, callbackUrl: '/' });
          location.reload();
        }}
      >
        ~/signout
      </button>
    </header>
  );
}
