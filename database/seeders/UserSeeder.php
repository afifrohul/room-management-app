<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Superadmin',
            'email' => 'superadmin@ilkom.unej.ac.id',
        ])->assignRole('Superadmin');
        
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@ilkom.unej.ac.id',
        ])->assignRole('Admin');

        User::factory()->create([
            'name' => 'TU',
            'email' => 'tu@ilkom.unej.ac.id',
        ])->assignRole('TU');
        
        User::factory()->create([
            'name' => 'BEM',
            'email' => 'bem@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'BPM',
            'email' => 'bpm@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'HIMASIF',
            'email' => 'himasif@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'HIMATIF',
            'email' => 'himatif@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'HMIF',
            'email' => 'hmif@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'ETALASE',
            'email' => 'etalase@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'LAOS',
            'email' => 'laos@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'MACO',
            'email' => 'maco@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'AL-AZHAR',
            'email' => 'al-azhar@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'BINARY',
            'email' => 'binary@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'BALWANA',
            'email' => 'balwana@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');

        User::factory()->create([
            'name' => 'ASTANAWIDYA',
            'email' => 'astanawidya@ilkom.unej.ac.id',
        ])->assignRole('UKM/ORMAWA');
    }
}
