'use client';

import { useInvoices } from '@/features/invoices/hooks/use-invoices';

export default function InvoiceManagementPage() {
  const { data: invoices, isLoading } = useInvoices();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Invoice Management</h1>
      <p className="text-muted-foreground mb-6">Manage and create invoices.</p>

      <div className="grid gap-4">
        {invoices?.map((invoice: any) => (
          <div key={invoice.id} className="border rounded p-4">
            <pre>{JSON.stringify(invoice, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
