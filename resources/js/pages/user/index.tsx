import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/data/user';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SquarePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
];

interface IndexProps {
    users: User[];
}

export default function Index({ users }: IndexProps) {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'User Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'User Email',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'roles.name',
            header: 'User Role',
            cell: ({ row }) => row.original.roles[0]?.name,
        },
        {
            accessorKey: 'created_at',
            header: 'Created Date',
            cell: (info) =>
                format(info.getValue() as Date, 'dd MMMM yyyy - HH:mm:ss'),
        },
        {
            accessorKey: 'updated_at',
            header: 'Last Updated',
            cell: (info) =>
                format(info.getValue() as Date, 'dd MMMM yyyy - HH:mm:ss'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/users/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/users/${row.original.id}`}
                        confirmMessage="Are you sure to delete this user?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<User>
                            showIndexColumn
                            columns={columns}
                            data={users}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() => router.get('/users/create')}
                                >
                                    <SquarePlus className="" /> Create New
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
