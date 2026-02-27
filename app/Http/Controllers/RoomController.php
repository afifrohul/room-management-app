<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $rooms = Room::select('id', 'name', 'desc', 'created_at')->get();
            return Inertia::render('room/index', compact('rooms'));
        } catch (\Exception $e) {
            Log::error('Error loading rooms: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load rooms.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('room/create');
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
        $request->validate([
            'name' => 'required',
            'desc' => 'required',
        ]);

        try {

            $room = new Room();
            $room->name = $request->name;
            $room->desc = $request->desc;
            $room->save();

            return redirect()->route('rooms.index')->with('success', 'Room created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating room: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create room.');
        }
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
        //
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
