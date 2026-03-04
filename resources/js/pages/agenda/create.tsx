import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AgendaForm } from './partials/formAgenda';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agenda Room Request - Create', href: '/agenda-rooms/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Agenda Room Request" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Agenda Room Request
                    </h1>
                    <Separator className="my-4" />
                    <AgendaForm submitUrl="/agenda-rooms" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
