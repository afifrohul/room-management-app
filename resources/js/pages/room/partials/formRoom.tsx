import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface RoomFormProps {
    initialData?: {
        id: number;
        name: string;
        desc: string;
        status: 'available' | 'unavailable';
    };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function RoomForm({
    initialData,
    submitUrl,
    method = 'post',
}: RoomFormProps) {
    const { errors } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: initialData?.name || '',
        desc: initialData?.desc || '',
        status: initialData?.status || '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsSubmitting(true);

        router[method](submitUrl, form, {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });
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
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter room name"
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
                            htmlFor="desc"
                            className={`${errors.desc ? 'text-destructive' : ''}`}
                        >
                            Description
                        </FieldLabel>
                        <Textarea
                            id="desc"
                            name="desc"
                            placeholder="Enter room description"
                            rows={4}
                            value={form.desc}
                            onChange={handleChange}
                            className={`${errors.desc ? 'border-destructive' : ''}`}
                        />
                        {errors.desc && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.desc}
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
                            value={form.status}
                            onValueChange={(value) =>
                                setForm({ ...form, status: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="available">
                                        Available
                                    </SelectItem>
                                    <SelectItem value="unavailable">
                                        Unavailable
                                    </SelectItem>
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
                    disabled={isSubmitting}
                    onClick={() => router.get('/rooms')}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
