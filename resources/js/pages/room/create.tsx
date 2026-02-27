import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RoomForm } from './partials/formRoom';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Room - Create', href: '/rooms/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Room" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Room</h1>
                    <Separator className="my-4" />
                    <RoomForm submitUrl="/rooms" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
