'use client';

import { useDatas } from '@/features/datas/hooks/use-datas';

export default function DataImport/exportPage() {
  const { data: datas, isLoading } = useDatas();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Import/Export</h1>
      <p className="text-muted-foreground mb-6">Import and export financial data.</p>
      
      <div className="grid gap-4">
        {datas?.map((data: any) => (
          <div key={data.id} className="border rounded p-4">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
