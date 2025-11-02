'use client';

import { useExpenses } from '@/features/expenses/hooks/use-expenses';

export default function ExpenseTrackingPage() {
  const { data: expenses, isLoading } = useExpenses();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Expense Tracking</h1>
      <p className="text-muted-foreground mb-6">Track and manage expenses.</p>
      
      <div className="grid gap-4">
        {expenses?.map((expense: any) => (
          <div key={expense.id} className="border rounded p-4">
            <pre>{JSON.stringify(expense, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
