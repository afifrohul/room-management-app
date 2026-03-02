import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Agenda } from '@/types/data/agenda';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    CircleAlert,
    CircleArrowUp,
    CircleCheck,
    CircleX,
    SquarePlus,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agenda Room Request',
        href: '/agenda-rooms',
    },
];

interface IndexProps {
    agendas: Agenda[];
}

export default function Index({ agendas }: IndexProps) {
    const columns: ColumnDef<Agenda>[] = [
        {
            accessorKey: 'user.name',
            header: 'Applicant',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'desc',
            header: 'Description',
            cell: ({ row }) =>
                row.original.desc?.length > 25
                    ? row.original.desc.substring(0, 25) + '...'
                    : row.original.desc || '-',
        },
        {
            accessorKey: 'agenda_room_bookings',
            header: 'Room Request',
            cell: ({ row }) => (
                <div>
                    {row.original.agenda_room_bookings?.map((item, index) => (
                        <p key={index}>
                            {item.room.name} |{' '}
                            {format(item.start_datetime, 'dd MMM yyyy - HH.mm')}{' '}
                            - {format(item.end_datetime, 'dd MMM yyyy - HH.mm')}
                        </p>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) =>
                row.original.status == 'requested' ? (
                    <SubtleBadge
                        label={row.original.status}
                        color="blue"
                        icon={<CircleArrowUp className="h-3.5 w-3.5" />}
                    />
                ) : row.original.status == 'approved' ? (
                    <SubtleBadge
                        label={row.original.status}
                        color="teal"
                        icon={<CircleCheck className="h-3.5 w-3.5" />}
                    />
                ) : row.original.status == 'rejected' ? (
                    <SubtleBadge
                        label={row.original.status}
                        color="rose"
                        icon={<CircleX className="h-3.5 w-3.5" />}
                    />
                ) : row.original.status == 'revision' ? (
                    <SubtleBadge
                        label={row.original.status}
                        color="yellow"
                        icon={<CircleAlert className="h-3.5 w-3.5" />}
                    />
                ) : null,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/agenda-rooms/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/agenda-rooms/${row.original.id}`}
                        confirmMessage="Are you sure to delete this request?"
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
                        <DataTable<Agenda>
                            showIndexColumn
                            columns={columns}
                            data={agendas}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/agenda-rooms/create')
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
