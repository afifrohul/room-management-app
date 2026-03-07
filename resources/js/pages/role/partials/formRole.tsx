import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface RoleFormProps {
    initialData?: {
        id: number;
        name: string;
        permissions: string[];
    };
    submitUrl: string;
    method?: 'post' | 'put';
    permissions: [];
}

export function RoleForm({
    initialData,
    submitUrl,
    method = 'post',
    permissions,
}: RoleFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        permissions: initialData?.permissions || ([] as string[]),
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
                <FieldGroup>
                    <Field>
                        <FieldLabel
                            htmlFor="name"
                            className={`${errors.name ? 'text-destructive' : ''}`}
                        >
                            Name
                        </FieldLabel>
                        <FieldDescription className="text-xs">
                            Choose a unique role name.
                        </FieldDescription>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter role name"
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
                            htmlFor="permission"
                            className={`${errors.permissions ? 'text-destructive' : ''}`}
                        >
                            Permission
                        </FieldLabel>
                        <MultiSelect
                            options={permissions}
                            onValueChange={(value) =>
                                setData('permissions', value)
                            }
                            defaultValue={data.permissions}
                            placeholder="Select permissions"
                            maxCount={6}
                        />
                        {errors.permissions && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.permissions}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/roles')}
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
