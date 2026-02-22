import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UserForm } from './partials/formUser';
import { User } from '@/types/user';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User - Edit', href: '/users/edit' },
];

interface EditProps {
    user: User;
}

export default function Edit({ user }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit User</h1>
                    <Separator className="my-4" />
                    <UserForm
                        submitUrl={`/users/${user.id}`}
                        method="put"
                        initialData={user}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
