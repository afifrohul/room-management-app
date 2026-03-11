'use client';

import { useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandEmpty,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Room } from '@/types/data/room';

interface RoomFilterProps {
    rooms: Room[];
    selected: number[];
    onChange: (values: number[]) => void;
}

export function RoomFilter({ rooms, selected, onChange }: RoomFilterProps) {
    const [open, setOpen] = useState(false);

    const toggleRoom = (id: number) => {
        const updated = selected.includes(id)
            ? selected.filter((h) => h !== id)
            : [...selected, id];

        onChange(updated);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    Filter Room
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit p-0">
                <Command>
                    <CommandInput placeholder="Search habit..." />
                    <CommandEmpty>No rooms found.</CommandEmpty>

                    <CommandGroup>
                        {rooms.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={item.name}
                                onSelect={() => toggleRoom(item.id)}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-3 w-3 rounded"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span>{item.name}</span>
                                </div>

                                {selected.includes(item.id) && (
                                    <Check className="h-4 w-4" />
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
