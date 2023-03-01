'use client';

export default function Error() {
  return (
    <div className="mt-8 rounded-md bg-red-800/20 p-4">
      <div className="flex">
        <p className="mx-3 text-sm font-medium text-red-500">
          An error occurred while loading this page. Please try again later.
        </p>
      </div>
    </div>
  );
}
