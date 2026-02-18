<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'permission.view']);
        Permission::create(['name' => 'permission.create']);
        Permission::create(['name' => 'permission.update']);
        Permission::create(['name' => 'permission.delete']);

        Permission::create(['name' => 'role.view']);
        Permission::create(['name' => 'role.create']);
        Permission::create(['name' => 'role.update']);
        Permission::create(['name' => 'role.delete']);

        Permission::create(['name' => 'user.view']);
        Permission::create(['name' => 'user.create']);
        Permission::create(['name' => 'user.update']);
        Permission::create(['name' => 'user.delete']);

        Permission::create(['name' => 'room.view']);
        Permission::create(['name' => 'room.create']);
        Permission::create(['name' => 'room.update']);
        Permission::create(['name' => 'room.delete']);

        Permission::create(['name' => 'room-request.view']);
        Permission::create(['name' => 'room-request.create']);
        Permission::create(['name' => 'room-request.update']);
        Permission::create(['name' => 'room-request.delete']);
        Permission::create(['name' => 'room-request.approve']);
        Permission::create(['name' => 'room-request.reject']);

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Role::create(['name' => 'Superadmin']);
        Role::create(['name' => 'Admin'])
            ->givePermissionTo([
                    'permission.view',
                    'permission.create',
                    'permission.update',
                    'permission.delete',
                    'role.view',
                    'role.create',
                    'role.update',
                    'role.delete',
                    'user.view',
                    'user.create',
                    'user.update',
                    'user.delete'
                ]);

        Role::create(['name' => 'TU'])
            ->givePermissionTo([
                    'room.view',
                    'room.create',
                    'room.update',
                    'room.delete',
                    'room-request.view',
                    'room-request.create', 
                    'room-request.update',
                    'room-request.delete',
                    'room-request.approve',
                    'room-request.reject'
                ]);
                
        Role::create(['name' => 'UKM/ORMAWA'])
            ->givePermissionTo([
                    'room.view',
                    'room-request.view',
                    'room-request.create', 
                    'room-request.update',
                    'room-request.delete',
                    'room-request.approve',
                    'room-request.reject'
                ]);
    }
}
