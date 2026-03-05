import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AgendaForm } from './partials/formAgenda';
import { Agenda } from '@/types/data/agenda';
import { Room } from '@/types/data/room';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agenda Room Request - Edit', href: '/agenda-rooms/edit' },
];

interface EditProps {
    agenda: Agenda;
    rooms: Room[];
}

export default function Edit({ agenda, rooms }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Agenda Room Request" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Agenda Room Request
                    </h1>
                    <Separator className="my-4" />
                    <AgendaForm
                        submitUrl={`/agenda-rooms/${agenda.id}`}
                        method="put"
                        initialData={agenda}
                        rooms={rooms}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
