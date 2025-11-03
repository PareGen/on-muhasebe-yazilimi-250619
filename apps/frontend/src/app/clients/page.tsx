'use client';

import { useClients } from '@/features/clients/hooks/use-clients';

export default function ClientManagementPage() {
  const { data: clients, isLoading } = useClients();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Client Management</h1>
      <p className="text-muted-foreground mb-6">Manage client information and interactions.</p>

      <div className="grid gap-4">
        {clients?.map((client: any) => (
          <div key={client.id} className="border rounded p-4">
            <pre>{JSON.stringify(client, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
