import Table from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const sp = (await searchParams) ?? {};
  const query = sp.query ?? '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>

      <Suspense key={query} fallback={<CustomersTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}