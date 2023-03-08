'use client';

import { api } from '@/lib/api';
import clsx from '@/lib/clsx';
import { useRef, useState } from 'react';

interface ToggleButtonProps {
  children: React.ReactNode;
  className?: string;
  activeToggle?: '+' | '-';
  toggledClassName?: string;
  value?: '+' | '-' | '~';
  onClick?: () => void;
}

const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

const ToggleButton = ({
  children,
  className,
  activeToggle,
  toggledClassName,
  value,
  onClick,
}: ToggleButtonProps) => {
  const toggled = activeToggle === value;

  return (
    <button
      className={clsx(
        'border border-white/10 py-2 text-4xl text-white hover:opacity-90',
        className,
        toggled && toggledClassName
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function Home() {
  const [activeToggle, setActiveToggle] = useState<'+' | '-'>('+');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const amountRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const transactions = api.transactions.getAll.useQuery();

  return (
    <section className="flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex w-full flex-col rounded-md bg-white/10 sm:w-24">
          <ToggleButton
            className="rounded-t-md border border-white/10 py-2 text-4xl text-white"
            value="+"
            toggledClassName="bg-white/20"
            activeToggle={activeToggle}
            onClick={() => setActiveToggle('+')}
          >
            +
          </ToggleButton>
          <ToggleButton
            className="rounded-b-md border border-t-0 border-white/10 py-2 text-4xl text-white"
            value="-"
            toggledClassName="bg-white/20"
            activeToggle={activeToggle}
            onClick={() => setActiveToggle('-')}
          >
            -
          </ToggleButton>
        </div>
        <div
          className="w-full sm:w-40"
          onClick={() => amountRef.current?.focus()}
        >
          <div className="focus-within:border-white/500 h-full rounded-md border border-white/10 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-white">
            <label
              htmlFor="amount"
              className="block text-xl font-medium text-white"
            >
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              ref={amountRef}
              className="mt-2 block w-full border-0 bg-transparent p-0 text-white placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
              placeholder="69"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="truncate">
              {isNumber(amount) ? (
                <span
                  className={clsx(
                    'text-xs',
                    activeToggle === '+' && 'text-green-500',
                    activeToggle === '-' && 'text-red-500'
                  )}
                >
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(amount))}
                </span>
              ) : (
                <span className="text-xs text-red-500">Invalid Amount</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full" onClick={() => noteRef.current?.focus()}>
          <div className="focus-within:border-white/500 h-full rounded-md border border-white/10 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-white">
            <label
              htmlFor="note"
              className="block text-xl font-medium text-white"
            >
              Note
            </label>
            <input
              type="text"
              name="note"
              id="note"
              ref={noteRef}
              className="mt-2 block w-full border-0 bg-transparent p-0 text-white placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
              placeholder="Bought an apple"
              autoComplete="off"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <button className="flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Create Transaction
        </button>
      </div>
    </section>
  );
}
