'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="absolute inset-0 flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl">Sign in to get started</h2>
      <button
        className="mt-4 rounded-md bg-white px-5 py-2 text-black hover:bg-white/90 focus:ring-2 focus:ring-gray-400"
        onClick={() => signIn('google')}
      >
        Continue with Google
      </button>
    </div>
  );
}
