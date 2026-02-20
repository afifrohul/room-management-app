import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RoleForm } from './partials/formRole';
import { Role } from '@/types/role';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Role - Edit', href: '/roles/edit' },
];

interface EditProps {
    role: Role;
}

export default function Edit({ role }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Role</h1>
                    <Separator className="my-4" />
                    <RoleForm
                        submitUrl={`/roles/${role.id}`}
                        method="put"
                        initialData={role}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
