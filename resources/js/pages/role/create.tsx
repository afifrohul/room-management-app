import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RoleForm } from './partials/formRole';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Role - Create', href: '/roles/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Role</h1>
                    <Separator className="my-4" />
                    <RoleForm submitUrl="/roles" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
