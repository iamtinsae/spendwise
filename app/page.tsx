'use client';

import { api } from '@/lib/api';
import clsx from '@/lib/clsx';
import { useRef, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Category } from '@prisma/client';
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  DeltaType,
  MultiSelectBox,
  MultiSelectBoxItem,
} from '@tremor/react';

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

interface CategoriesSelectorProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

const CategoriesSelector = ({
  selectedCategory,
  setSelectedCategory,
}: CategoriesSelectorProps) => {
  const { data, isLoading } = api.categories.getAll.useQuery();

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-white">
            Category
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-700 bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
              <span className="block truncate">
                {selectedCategory?.name ?? 'Select Spending Category'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <Listbox.Option
                  className={({ active }) =>
                    clsx(
                      active ? 'bg-gray-600 text-white' : 'text-gray-100',
                      'relative cursor-default select-none py-2 pl-8 pr-4'
                    )
                  }
                  value={null}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        -
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
                {data?.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-gray-600 text-white' : 'text-gray-100',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {category.name}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default function Home() {
  const [activeToggle, setActiveToggle] = useState<'+' | '-'>('+');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const amountRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const { data: transactions, refetch } = api.transactions.getAll.useQuery();
  const createTransaction = api.transactions.create.useMutation();

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
      <CategoriesSelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div>
        <button
          className="flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => {
            createTransaction.mutate({
              note,
              amount: Number(amount),
              type: activeToggle === '+' ? 'DEPOSIT' : 'WITHDRAW',
              categoryId: selectedCategory?.id ?? null,
            });

            refetch();
          }}
        >
          Create Transaction
        </button>
      </div>

      <h1 className="text-2xl">Transactions</h1>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-white">Date</TableHeaderCell>
            <TableHeaderCell className="text-white">Category</TableHeaderCell>
            <TableHeaderCell className="text-white">Note</TableHeaderCell>
            <TableHeaderCell className="text-right text-white">
              Amount ($)
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-white">
              Type
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
        {transactions?.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="text-gray-100">
              {transaction.createdAt.toDateString()}
            </TableCell>
            <TableCell className="text-gray-100">
              {transaction.category?.name ?? '-'}
            </TableCell>
            <TableCell className="text-gray-100">{transaction.note}</TableCell>
            <TableCell className="text-right text-gray-100">
              {transaction.amount}
            </TableCell>
            <TableCell className="text-right text-gray-100">
              <BadgeDelta
                deltaType={
                  transaction.type === 'WITHDRAW' ? 'decrease' : 'increase'
                }
                size="xs"
              >
                {transaction.type}
              </BadgeDelta>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <div></div>
    </section>
  );
}
