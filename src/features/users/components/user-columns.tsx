'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { getInitials } from '@/shared/lib/utils';
import { type InferSelectModel } from 'drizzle-orm';
import { user } from '@/shared/lib/db-schema';

export type User = InferSelectModel<typeof user>;

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const image = row.original.image as string | null;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {image && <AvatarImage src={image} alt={name} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'emailVerified',
    header: 'Status',
    cell: ({ row }) => {
      const isVerified = row.getValue('emailVerified') as boolean;
      return (
        <Badge variant={isVerified ? 'default' : 'secondary'}>
          {isVerified ? 'Verified' : 'Unverified'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastLoginMethod',
    header: 'Login Method',
    cell: ({ row }) => {
      const method = row.getValue('lastLoginMethod') as string | null;
      return (
        <span className="text-muted-foreground capitalize">
          {method || 'Unknown'}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },
];
