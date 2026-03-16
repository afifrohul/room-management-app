import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { Auth, BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import {
    CalendarDays,
    CalendarRange,
    Clock,
    DoorOpen,
    Key,
    UserCog,
    Users,
} from 'lucide-react';
import { MdOutlineWavingHand } from 'react-icons/md';
import DashboardCardInfo from '@/components/dashboard-card-info';
import { useCan } from '@/lib/can';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    permissionCount: number;
    roleCount: number;
    userCount: number;
    roomCount: number;
    agendaRequestCount: number;
}

export default function Dashboard({
    permissionCount,
    roleCount,
    userCount,
    roomCount,
    agendaRequestCount,
}: DashboardProps) {
    const { can } = useCan();

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
                <div className="grid grid-cols-3 gap-4">
                    {can('permission.view') && (
                        <DashboardCardInfo
                            color="teal"
                            data={permissionCount}
                            desc="Total Permission(s)"
                            icon={<Key className="h-3.5 w-3.5 text-teal-500" />}
                        />
                    )}
                    {can('role.view') && (
                        <DashboardCardInfo
                            color="blue"
                            data={roleCount}
                            desc="Total Role(s)"
                            icon={
                                <UserCog className="h-3.5 w-3.5 text-blue-500" />
                            }
                        />
                    )}
                    {can('user.view') && (
                        <DashboardCardInfo
                            color="purple"
                            data={userCount}
                            desc="Total Users(s)"
                            icon={
                                <Users className="h-3.5 w-3.5 text-purple-500" />
                            }
                        />
                    )}
                    {can('room.view')}
                    <DashboardCardInfo
                        color="amber"
                        data={roomCount}
                        desc="Total Room(s)"
                        icon={
                            <DoorOpen className="h-3.5 w-3.5 text-amber-500" />
                        }
                    />
                    <DashboardCardInfo
                        color="fuchsia"
                        data={agendaRequestCount}
                        desc="Total Agenda Request(s)"
                        icon={
                            <CalendarRange className="h-3.5 w-3.5 text-fuchsia-500" />
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
