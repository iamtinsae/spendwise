'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

export default function CategoriesPage() {
  const [name, setName] = useState('');
  const categories = api.categories.getAll.useQuery();
  const createCategory = api.categories.create.useMutation();

  const handleCreateCategory = async () => {
    await createCategory.mutateAsync({ name });
    setName('');
    categories.refetch();
  };

  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-x-5 sm:flex-row">
        <div className="focus-within:border-white/500 h-full w-full rounded-md border border-white/20 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-white">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full border-0 bg-transparent p-0 text-white placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="Groceries"
          />
          <div className="truncate"></div>
        </div>

        <button
          className="flex h-full w-64 items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          onClick={handleCreateCategory}
        >
          {createCategory.isLoading ? (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            'Create Category'
          )}
        </button>
      </div>

      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl text-primary">Categories</h1>

        <div className="flex flex-col gap-y-5">
          {categories.data?.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-y-5 sm:flex-row"
            >
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
