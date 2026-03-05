import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';

interface PermissionFormProps {
    initialData?: {
        id: number;
        name: string;
    };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function PermissionForm({
    initialData,
    submitUrl,
    method = 'post',
}: PermissionFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
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
            <FieldGroup>
                <Field>
                    <FieldLabel
                        htmlFor="name"
                        className={errors.name ? 'text-destructive' : ''}
                    >
                        Name
                    </FieldLabel>

                    <FieldDescription className="text-xs">
                        Choose a unique permission name using "resource.action"
                        format. Example: post.create
                    </FieldDescription>

                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Enter permission name"
                        className={errors.name ? 'border-destructive' : ''}
                    />

                    {errors.name && (
                        <FieldDescription className="text-xs text-destructive">
                            {errors.name}
                        </FieldDescription>
                    )}
                </Field>
            </FieldGroup>

            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/permissions')}
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
