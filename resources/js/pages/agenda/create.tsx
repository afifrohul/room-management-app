import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AgendaForm } from './partials/formAgenda';
import { Room } from '@/types/data/room';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agenda Room Request - Create', href: '/agenda-rooms/create' },
];

interface CreateProps {
    rooms: Room[];
}

export default function Create({ rooms }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Agenda Room Request" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Agenda Room Request
                    </h1>
                    <Separator className="my-4" />
                    <AgendaForm
                        submitUrl="/agenda-rooms"
                        method="post"
                        rooms={rooms}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
