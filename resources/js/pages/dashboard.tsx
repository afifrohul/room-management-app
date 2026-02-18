import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { Auth, BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { MdOutlineWavingHand } from 'react-icons/md';
import DataTable from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import EditButton from '@/components/edit-button';
import DeleteButton from '@/components/delete-button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type User = {
    id: number;
    name: string;
    email: string;
};

interface DashboardProps {
    users: User[];
}

export default function Dashboard({ users }: DashboardProps) {
    const { auth } = usePage().props as unknown as { auth: Auth };

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const date = now.toLocaleDateString('en-EN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <p className='border rounded px-1 py-0.5 bg-accent'>Edit Button Here</p>
                    <p className='border rounded px-1 py-0.5 bg-accent'>Delete Button Here</p>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 flex-1 space-y-2 rounded-md border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                                <MdOutlineWavingHand className="text-cyan-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Welcome to dashboard, {auth.user.name}!
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Hava a good day.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center rounded-md border bg-card px-8">
                        <div className="flex items-center justify-center gap-8 italic">
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {date}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-3.5 w-3.5" />
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex w-full flex-col gap-4 rounded-lg border p-4">
                    <DataTable<User>
                        showIndexColumn
                        columns={columns}
                        data={users}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
