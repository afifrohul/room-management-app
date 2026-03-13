import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Room - Show',
        href: '/rooms/show',
    },
];

interface ShowProps {
    room: Room;
    schedule: [];
}

export default function Show({ room, schedule }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Agenda Room Request" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">{room.name}</h1>
                        {room.status == 'available' ? (
                            <SubtleBadge
                                label={room.status}
                                color="teal"
                                icon={<CircleArrowUp className="h-3.5 w-3.5" />}
                            />
                        ) : room.status == 'unavailable' ? (
                            <SubtleBadge
                                label={room.status}
                                color="rose"
                                icon={<CircleCheck className="h-3.5 w-3.5" />}
                            />
                        ) : null}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">
                                Room Description:
                            </p>
                            <p className="text-sm">{room.desc}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                Room Schedule:
                            </p>
                            <div className="rounded-lg border p-4 text-xs">
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
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/rooms')}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
