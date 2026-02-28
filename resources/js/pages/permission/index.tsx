import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Permission } from '@/types/data/permission';
import { SquarePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permission',
        href: '/permissions',
    },
];

interface IndexProps {
    permissions: Permission[];
}

export default function Index({ permissions }: IndexProps) {
    const columns: ColumnDef<Permission>[] = [
        {
            accessorKey: 'name',
            header: 'Permission Name',
            cell: (info) => info.getValue(),
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
                    <EditButton url={`/permissions/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/permissions/${row.original.id}`}
                        confirmMessage="Are you sure to delete this permission?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permission" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Permission>
                            showIndexColumn
                            columns={columns}
                            data={permissions}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/permissions/create')
                                    }
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
