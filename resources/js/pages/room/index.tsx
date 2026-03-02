import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Room } from '@/types/data/room';
import { CircleAlert, CircleCheck, CircleX, SquarePlus } from 'lucide-react';
import SubtleBadge from '@/components/subtle-badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Room',
        href: '/rooms',
    },
];

interface IndexProps {
    rooms: Room[];
}

export default function Index({ rooms }: IndexProps) {
    const columns: ColumnDef<Room>[] = [
        {
            accessorKey: 'name',
            header: 'Room Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'desc',
            header: 'Description',
            cell: ({ row }) =>
                row.original.desc?.length > 120
                    ? row.original.desc.substring(0, 120) + '...'
                    : row.original.desc || '-',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) =>
                row.original.status == 'available' ? (
                    <SubtleBadge
                        label={row.original.status}
                        color="teal"
                        icon={<CircleCheck className="h-3.5 w-3.5" />}
                    />
                ) : (
                    <SubtleBadge
                        label={row.original.status}
                        color="rose"
                        icon={<CircleX className="h-3.5 w-3.5" />}
                    />
                ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created Date',
            cell: (info) =>
                format(info.getValue() as Date, 'dd MMMM yyyy - HH.mm.ss'),
        },
        {
            accessorKey: 'updated_at',
            header: 'Last Updated',
            cell: (info) =>
                format(info.getValue() as Date, 'dd MMMM yyyy - HH.mm.ss'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/rooms/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/rooms/${row.original.id}`}
                        confirmMessage="Are you sure to delete this room?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Room" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Room>
                            showIndexColumn
                            columns={columns}
                            data={rooms}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() => router.get('/rooms/create')}
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
