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
import { router, useForm } from '@inertiajs/react';

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
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        desc: initialData?.desc || '',
        status: initialData?.status || '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
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
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
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
                            value={data.desc}
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
                            htmlFor="status"
                            className={`${errors.status ? 'text-destructive' : ''}`}
                        >
                            Status
                        </FieldLabel>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData('status', value)}
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
                    disabled={processing}
                    onClick={() => router.get('/rooms')}
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
