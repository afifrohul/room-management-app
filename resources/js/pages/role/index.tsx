import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FaPlusCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { Role } from '@/types/role';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role',
        href: '/roles',
    },
];

interface IndexProps {
    roles: Role[];
}

export default function Index({ roles }: IndexProps) {
    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: 'name',
            header: 'Role Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'permissions',
            header: 'Permissions',
            cell: ({ row }) => (
                <div>
                    {row.original.name === 'Superadmin'
                        ? 'all permissions'
                        : null}
                    {row.original.permissions?.map((item, index) => (
                        <p key={index}>{item.name}</p>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: (info) => format(info.getValue() as Date, 'dd MMMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/roles/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/roles/${row.original.id}`}
                        confirmMessage="Are you sure to delete this roles?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Role>
                            showIndexColumn
                            columns={columns}
                            data={roles}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() => router.get('/roles/create')}
                                >
                                    <FaPlusCircle className="mr-2" /> Create New
                                    Role
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
