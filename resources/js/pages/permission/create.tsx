import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PermissionForm } from './partials/formPermission';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Permission - Create', href: '/permissions/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Permision</h1>
                    <Separator className="my-4" />
                    <PermissionForm submitUrl="/permissions" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
