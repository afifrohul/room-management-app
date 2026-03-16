<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Room;
use App\Models\Agenda;

class DashboardController extends Controller
{
    public function index()
    {
        $permissionCount = Permission::count();
        $roleCount = Role::count();
        $userCount = User::count();
        $roomCount = Room::count();
        $agendaRequestCount = Agenda::count();

        return Inertia::render('dashboard', compact('permissionCount', 'roleCount', 'userCount', 'roomCount', 'agendaRequestCount'));
    }
}
