<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $agendas = Agenda::with(['user', 'agendaRoomBookings.room'])->latest()->get();
            
            return Inertia::render('agenda/index', compact('agendas'));
        } catch (\Exception $e) {
            Log::error('Error loading agenda rooms: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load agenda rooms.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('agenda/create');
        } catch (\Exception $e) {
            Log::error('Error loading create form: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load create form.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $agenda = Agenda::findOrFail($id);
            return Inertia::render('agenda/edit', compact('agenda'));
        } catch (\Exception $e) {
            Log::error('Error loading edit form: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load edit form.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
