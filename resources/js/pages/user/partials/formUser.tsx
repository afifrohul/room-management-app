import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Role } from '@/types/data/role';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface UserFormProps {
    initialData?: {
        id: number;
        name: string;
        email: string;
        password: string;
        roles: Role[];
    };
    submitUrl: string;
    method?: 'post' | 'put';
    roles: Role[];
}

export function UserForm({
    initialData,
    submitUrl,
    method = 'post',
    roles,
}: UserFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        email: initialData?.email || '',
        password: '',
        role: initialData?.roles[0]?.name || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (method === 'post') {
            post(submitUrl);
        } else {
            put(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <FieldGroup className="gap-4">
                    <Field>
                        <FieldLabel
                            htmlFor="name"
                            className={`${errors.name ? 'text-destructive' : ''}`}
                        >
                            Name
                        </FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className={`${errors.name ? 'border-destructive' : ''}`}
                        />
                        {errors.name && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.name}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel
                            htmlFor="email"
                            className={`${errors.email ? 'text-destructive' : ''}`}
                        >
                            Email
                        </FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className={`${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.email}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel
                            htmlFor="password"
                            className={`${errors.password ? 'text-destructive' : ''}`}
                        >
                            Password
                        </FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className={`${errors.password ? 'border-destructive' : ''}`}
                        />
                        {errors.password && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.password}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel
                            htmlFor="role"
                            className={`${errors.role ? 'text-destructive' : ''}`}
                        >
                            Role
                        </FieldLabel>
                        <Select
                            value={data.role}
                            onValueChange={(value) => setData('role', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {roles?.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={role.name}
                                        >
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/users')}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
