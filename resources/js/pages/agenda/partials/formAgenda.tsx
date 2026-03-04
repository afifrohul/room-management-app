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

interface AgendaFormProps {
    initialData?: {
        id: number;
        title: string;
        desc: string;
    };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function AgendaForm({
    initialData,
    submitUrl,
    method = 'post',
}: AgendaFormProps) {
    const { errors } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: initialData?.title || '',
        desc: initialData?.desc || '',
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
                            className={`${errors.title ? 'text-destructive' : ''}`}
                        >
                            Title
                        </FieldLabel>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter agenda title"
                            className={`${errors.title ? 'border-destructive' : ''}`}
                        />
                        {errors.title && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.title}
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
                            placeholder="Enter agenda description"
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
                </FieldGroup>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/agenda-rooms')}
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
