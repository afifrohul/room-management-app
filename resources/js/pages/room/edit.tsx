import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RoomForm } from './partials/formRoom';
import { Room } from '@/types/data/room';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Room - Edit', href: '/room/edit' },
];

interface EditProps {
    room: Room;
}

export default function Edit({ room }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Room" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Room</h1>
                    <Separator className="my-4" />
                    <RoomForm
                        submitUrl={`/rooms/${room.id}`}
                        method="put"
                        initialData={room}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
