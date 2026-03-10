import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Room } from '@/types/data/room';
import { router, useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';

interface AgendaFormProps {
    initialData?: {
        id: number;
        title: string;
        desc: string;
        file: string;
        agenda_room_bookings: {
            room_id: number;
            start_datetime: string;
            end_datetime: string;
        }[];
    };
    submitUrl: string;
    method?: 'post' | 'put';
    rooms: Room[];
}

export function AgendaForm({
    initialData,
    submitUrl,
    method = 'post',
    rooms,
}: AgendaFormProps) {
    const { data, setData, post, put, processing, progress, errors } = useForm({
        title: initialData?.title || '',
        desc: initialData?.desc || '',
        file: (initialData?.file || '') as string | File,
        agenda_room_bookings: initialData?.agenda_room_bookings?.length
            ? initialData.agenda_room_bookings
            : [
                  {
                      room_id: 0,
                      start_datetime: '',
                      end_datetime: '',
                  },
              ],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const addBooking = () => {
        setData((prev) => ({
            ...prev,
            agenda_room_bookings: [
                ...prev.agenda_room_bookings,
                {
                    room_id: 0,
                    start_datetime: '',
                    end_datetime: '',
                },
            ],
        }));
    };

    const removeBooking = (index: number) => {
        setData((prev) => ({
            ...prev,
            agenda_room_bookings: prev.agenda_room_bookings.filter(
                (_, i) => i !== index,
            ),
        }));
    };

    const handleBookingChange = (
        index: number,
        field: string,
        value: string,
    ) => {
        const updatedBookings = [...data.agenda_room_bookings];
        updatedBookings[index] = {
            ...updatedBookings[index],
            [field]: value,
        };

        setData((prev) => ({
            ...prev,
            agenda_room_bookings: updatedBookings,
        }));
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
                            className={`${errors.title ? 'text-destructive' : ''}`}
                        >
                            Title
                        </FieldLabel>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
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
                        <FieldLabel htmlFor="file">File Proposal</FieldLabel>
                        {data.file && (
                            <div className="flex items-center gap-1">
                                <p className="text-xs">
                                    *Do not upload new files if you do not want
                                    to overwrite the old file.
                                </p>
                                <a
                                    href={data.file as string}
                                    target="_blank"
                                    className="text-xs text-indigo-600 underline"
                                >
                                    Click here to see old file
                                </a>
                            </div>
                        )}
                        <Input
                            id="file"
                            type="file"
                            name="file"
                            onChange={(e) => {
                                if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                ) {
                                    setData('file', e.target.files[0]);
                                }
                            }}
                        />
                        {progress && (
                            <Field className="w-full">
                                <FieldLabel htmlFor="progress-upload">
                                    <span className="text-xs">
                                        Upload progress
                                    </span>
                                    <span className="ml-auto text-xs">
                                        {progress.percentage}%
                                    </span>
                                </FieldLabel>
                                <Progress
                                    value={progress.percentage}
                                    id="progress-upload"
                                />
                            </Field>
                        )}
                    </Field>

                    {data.agenda_room_bookings.map((booking, index) => (
                        <div key={index} className="flex w-full">
                            <div className="w-full space-y-4 rounded-md border p-4">
                                <Field>
                                    <FieldLabel>Room</FieldLabel>
                                    <Select
                                        value={String(booking.room_id)}
                                        onValueChange={(value) =>
                                            handleBookingChange(
                                                index,
                                                'room_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a room" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {rooms.map((room) => (
                                                <SelectItem
                                                    key={room.id}
                                                    value={room.id.toString()}
                                                >
                                                    {room.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel>Start</FieldLabel>
                                    <Input
                                        type="datetime-local"
                                        value={booking.start_datetime}
                                        onChange={(e) =>
                                            handleBookingChange(
                                                index,
                                                'start_datetime',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>End</FieldLabel>
                                    <Input
                                        type="datetime-local"
                                        value={booking.end_datetime}
                                        onChange={(e) =>
                                            handleBookingChange(
                                                index,
                                                'end_datetime',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                            <div className="ml-4 flex justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-full"
                                    onClick={() => removeBooking(index)}
                                >
                                    <Trash className="text-rose-600" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={addBooking}
                        variant="outline"
                    >
                        + Add Room
                    </Button>
                </FieldGroup>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/agenda-rooms')}
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
