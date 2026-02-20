'use client';

import * as React from 'react';
import { useUsers } from '../hooks/use-users';
import { useUIStore } from '@/shared/stores/global-store';
import { DataTable } from '@/shared/components/data-table/data-table';
import { userColumns } from './user-columns';
import { Button } from '@/shared/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { getInitials } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function UsersListing() {
  const { data: users, isLoading, error } = useUsers();
  
  // Zustand State
  const viewMode = useUIStore((state) => state.viewMode);
  const toggleViewMode = useUIStore((state) => state.toggleViewMode);

  if (error) {
    return <div className="p-4 text-destructive">Failed to load users</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage platform users and their roles.</p>
        </div>
        
        {/* Toggle Button using Zustand */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleViewMode}
          className="gap-2"
        >
          {viewMode === 'grid' ? (
            <>
              <List className="h-4 w-4" />
              <span>Table View</span>
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4" />
              <span>Grid View</span>
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        // Loading State
        <div className="space-y-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : viewMode === 'list' ? (
        // TanStack Table Integration
        <DataTable
          columns={userColumns}
          data={users || []}
          filterKey="name"
        />
      ) : (
        // Grid View Integration
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <Card key={user.id} className="group hover:border-primary/50 transition-colors flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm bg-muted">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <CardTitle className="text-base truncate">{user.name}</CardTitle>
                  <CardDescription className="truncate">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-4">
                <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                  {user.emailVerified ? 'Verified' : 'Unverified'}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
