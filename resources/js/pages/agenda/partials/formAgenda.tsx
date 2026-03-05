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
import { Room } from '@/types/data/room';
import { router, usePage } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface AgendaFormProps {
    initialData?: {
        id: number;
        title: string;
        desc: string;
        agenda_room_bookings: [];
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
    console.log(initialData);

    const { errors } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: initialData?.title || '',
        desc: initialData?.desc || '',
        agenda_room_bookings: initialData?.agenda_room_bookings?.length
            ? initialData.agenda_room_bookings
            : [
                  {
                      room_id: '',
                      start_datetime: '',
                      end_datetime: '',
                  },
              ],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const addBooking = () => {
        setForm((prev) => ({
            ...prev,
            agenda_room_bookings: [
                ...prev.agenda_room_bookings,
                {
                    room_id: '',
                    start_datetime: '',
                    end_datetime: '',
                },
            ],
        }));
    };

    const removeBooking = (index: number) => {
        setForm((prev) => ({
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
        const updatedBookings = [...form.agenda_room_bookings];
        updatedBookings[index] = {
            ...updatedBookings[index],
            [field]: value,
        };

        setForm((prev) => ({
            ...prev,
            agenda_room_bookings: updatedBookings,
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

    console.log(form);

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
                    {form.agenda_room_bookings.map((booking, index) => (
                        <div key={index} className="flex w-full">
                            <div className="w-full space-y-4 rounded-md border p-4">
                                <Field>
                                    <FieldLabel>Room</FieldLabel>
                                    <Select
                                        value={booking.room_id.toString()}
                                        onValueChange={(value) =>
                                            handleBookingChange(
                                                index,
                                                'room_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select room" />
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
