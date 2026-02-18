<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', 1)->get();

        return Inertia::render('dashboard', compact('users'));
    }
}
