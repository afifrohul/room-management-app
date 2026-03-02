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
        id: number;
        start_datetime: string;
        end_datetime: string;
        room: Room;
    }[];
};
