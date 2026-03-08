import DataTable from '@/components/data-table';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Agenda } from '@/types/data/agenda';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    Building,
    Calendar,
    CalendarDays,
    CircleAlert,
    CircleArrowUp,
    CircleCheck,
    CircleX,
    DoorClosed,
    DoorOpen,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agenda Room Request - Show',
        href: '/agenda-rooms/show',
    },
];

interface RoomRequest {
    room_id: number;
    room: {
        name: string;
    };
    start_datetime: string;
    end_datetime: string;
}

interface ShowProps {
    agenda: Agenda;
}

export default function Show({ agenda }: ShowProps) {
    const columns: ColumnDef<RoomRequest>[] = [
        {
            accessorKey: 'room.name',
            header: 'Room Name',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <DoorOpen className="h-3.5 w-3.5 text-blue-600" />
                    <p>{row.original.room?.name}</p>
                </div>
            ),
        },
        {
            accessorKey: 'start_datetime',
            header: 'Start Date & Time',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-teal-600" />
                    <p>
                        {format(
                            row.original.start_datetime,
                            'EEEE, dd MMMM yyyy - HH:mm',
                        )}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'end_datetime',
            header: 'End Date & Time',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-amber-600" />
                    <p>
                        {format(
                            row.original.end_datetime,
                            'EEEE, dd MMMM yyyy - HH:mm',
                        )}
                    </p>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Agenda Room Request" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-xl font-bold">
                            {agenda.user?.name} - {agenda.title}
                        </h1>
                        {agenda.status == 'requested' ? (
                            <SubtleBadge
                                label={agenda.status}
                                color="blue"
                                icon={<CircleArrowUp className="h-3.5 w-3.5" />}
                            />
                        ) : agenda.status == 'approved' ? (
                            <SubtleBadge
                                label={agenda.status}
                                color="teal"
                                icon={<CircleCheck className="h-3.5 w-3.5" />}
                            />
                        ) : agenda.status == 'rejected' ? (
                            <SubtleBadge
                                label={agenda.status}
                                color="rose"
                                icon={<CircleX className="h-3.5 w-3.5" />}
                            />
                        ) : agenda.status == 'revision' ? (
                            <SubtleBadge
                                label={agenda.status}
                                color="yellow"
                                icon={<CircleAlert className="h-3.5 w-3.5" />}
                            />
                        ) : null}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">
                                Agenda Description:
                            </p>
                            <p className="text-sm">{agenda.desc}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                File Proposal:
                            </p>
                            <a
                                href={agenda.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-indigo-600 italic underline"
                            >
                                Click here to view the file
                            </a>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                Requeste At:
                            </p>
                            <p className="text-sm">
                                {format(
                                    agenda.created_at,
                                    'dd MMMM yyyy - HH:mm:ss',
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                Room Request:
                            </p>
                            <div className="mt-2 rounded-lg border p-4">
                                <DataTable<RoomRequest>
                                    showIndexColumn
                                    columns={columns}
                                    data={agenda.agenda_room_bookings || []}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/agenda-rooms')}
                            className="mt-2 w-fit"
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
