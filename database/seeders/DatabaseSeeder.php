<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            UserSeeder::class,
            RoomSeeder::class,
        ]);

        // \App\Models\User::factory(10)->create()->each(function ($user) {
        //     $user->assignRole('UKM/ORMAWA');
        // });
    }
}
