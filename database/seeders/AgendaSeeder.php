<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();

        for ($i = 1; $i <= 20; $i++) {

            $agendaId = \DB::table('agendas')->insertGetId([
                'user_id' => rand(3, 15),
                'title' => "Agenda Kegiatan {$i}",
                'desc' => "Deskripsi agenda kegiatan {$i}",
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            for ($j = 1; $j <= 2; $j++) {

                $date = Carbon::createFromTimestamp(
                    rand($startOfMonth->timestamp, $endOfMonth->timestamp)
                );

                $start = $date->copy()->setHour(rand(8, 15))->setMinute(0);
                $end = $start->copy()->addHours(rand(1, 3));

                \DB::table('agenda_room_bookings')->insert([
                    'agenda_id' => $agendaId,
                    'room_id' => rand(1, 7),
                    'start_datetime' => $start,
                    'end_datetime' => $end,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
