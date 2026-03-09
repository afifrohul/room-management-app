import { usePage } from '@inertiajs/react';

export function useCan() {
    const { props } = usePage();

    const roles = (props.auth as any).roles;
    const permissions = (props.auth as { permissions: string[] }).permissions;

    const can = (permission?: string | string[]) => {
        if (roles.includes('Superadmin')) {
            return true;
        }
        if (!permission) return true;

        if (Array.isArray(permission)) {
            return permission.some((p) => permissions.includes(p));
        }

        return permissions.includes(permission);
    };

    return { can };
}
