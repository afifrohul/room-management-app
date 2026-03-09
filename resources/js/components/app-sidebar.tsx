import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Logs,
    Users,
    Key,
    UserCog,
    DoorOpen,
    CalendarRange,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const dashboardItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const masterDataItems: NavItem[] = [
    {
        title: 'Permission',
        href: '/permissions',
        icon: Key,
        permission: 'permission.view',
    },
    {
        title: 'Role',
        href: '/roles',
        icon: UserCog,
        permission: 'role.view',
    },
    {
        title: 'User',
        href: '/users',
        icon: Users,
        permission: 'user.view',
    },
    {
        title: 'Room',
        href: '/rooms',
        icon: DoorOpen,
        permission: 'room.view',
    },
];

const requestItems: NavItem[] = [
    {
        title: 'Agenda & Room',
        href: '/agenda-rooms',
        icon: CalendarRange,
        permission: 'room-request.view',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Logs Viewer',
        href: '/log-viewer',
        icon: Logs,
        permission: 'log.view',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain header={'Dashboard'} items={dashboardItems} />
                <NavMain header={'Master Data'} items={masterDataItems} />
                <NavMain header={'Request'} items={requestItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
