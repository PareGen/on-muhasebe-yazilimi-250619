'use client';

import { usePayments } from '@/features/payments/hooks/use-payments';

export default function PaymentIntegrationPage() {
  const { data: payments, isLoading } = usePayments();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Payment Integration</h1>
      <p className="text-muted-foreground mb-6">Manage payment methods and transactions.</p>

      <div className="grid gap-4">
        {payments?.map((payment: any) => (
          <div key={payment.id} className="border rounded p-4">
            <pre>{JSON.stringify(payment, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
