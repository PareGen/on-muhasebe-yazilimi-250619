'use client';

export default function AdminUserManagementPage() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin User Management</h1>
      <p className="text-muted-foreground mb-6">Manage user accounts and roles.</p>
      
      <div className="grid gap-4">
        {users?.map((user: any) => (
          <div key={user.id} className="border rounded p-4">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
