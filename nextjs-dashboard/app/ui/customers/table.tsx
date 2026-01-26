// app/ui/customers/table.tsx

import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function CustomersTable({
  query,
}: {
  query: string;
}) {
  const customers = (await fetchFilteredCustomers(query)) ?? [];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile */}
          <div className="md:hidden">
            {customers.map((customer) => (
              <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center">
                    <div className="mr-2 flex items-center gap-2">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${customer.name}'s profile picture`}
                      />
                      <p>{customer.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    <p className="text-sm">Total invoices: {customer.total_invoices}</p>
                    <p className="text-sm">Total pending: {customer.total_pending}</p>
                    <p className="text-sm">Total paid: {customer.total_paid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Invoices
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Pending
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Paid
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="w-full border-b border-gray-100 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${customer.name}'s profile picture`}
                      />
                      <p>{customer.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">{customer.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.total_invoices}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.total_pending}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.total_paid}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No customers found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}