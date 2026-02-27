import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UserForm } from './partials/formUser';
import { Role } from '@/types/data/role';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User - Create', href: '/users/create' },
];

interface CreateProps {
    roles: Role[];
}

export default function Create({ roles }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create User</h1>
                    <Separator className="my-4" />
                    <UserForm submitUrl="/users" method="post" roles={roles} />
                </div>
            </div>
        </AppLayout>
    );
}
