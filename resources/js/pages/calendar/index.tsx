import SubtleBadge from '@/components/subtle-badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CircleArrowUp, CircleCheck } from 'lucide-react';
import { Room } from '@/types/data/room';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { RoomFilter } from '@/components/room-filter';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calendar',
        href: '/calendar',
    },
];

type Schedule = {
    id: number;
    title: string;
    start_datetime: string;
    end_datetime: string;
};

interface IndexProps {
    rooms: Room[];
    schedule: [];
}

export default function Index({ rooms, schedule }: IndexProps) {
    const roomIds = rooms.map((room) => room.id);
    const [selectedRoom, setSelectedRoom] = useState<number[]>(roomIds);

    const updateFilter = (values: number[]) => {
        setSelectedRoom(values);

        router.get(
            '/calendar',
            {
                rooms: values,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendar" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <div className="space-y-4 rounded-lg border p-4 text-xs">
                        <RoomFilter
                            rooms={rooms}
                            selected={selectedRoom}
                            onChange={updateFilter}
                        />
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
                            }}
                            events={schedule || []}
                            dayMaxEventRows={true}
                            nowIndicator
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
