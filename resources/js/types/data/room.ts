export type Room = {
    room: any;
    id: number;
    name: string;
    desc: string;
    status: 'available' | 'unavailable';
    created_at: string;
    updated_at: string;
};
