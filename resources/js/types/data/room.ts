export type Room = {
    id: number;
    name: string;
    desc: string;
    status: 'available' | 'unavailable';
    created_at: string;
    updated_at: string;
};
