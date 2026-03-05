import { Room } from './room';
import { User } from './user';

export type Agenda = {
    id: number;
    title: string;
    desc: string;
    file: string;
    revision_note: string;
    status: string;
    user: User;
    agenda_room_bookings: {
        room_id: number;
        room: Room;
        start_datetime: string;
        end_datetime: string;
    }[];
    created_at: string;
    updated_at: string;
};
