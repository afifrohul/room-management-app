import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PermissionForm } from './partials/formPermission';
import { Permission } from '@/types/data/permission';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Permission - Edit', href: '/permissions/edit' },
];

interface EditProps {
    permission: Permission;
}

export default function Edit({ permission }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Permission</h1>
                    <Separator className="my-4" />
                    <PermissionForm
                        submitUrl={`/permissions/${permission.id}`}
                        method="put"
                        initialData={permission}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
