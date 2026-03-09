<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\AgendaRoomBooking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $agendas = Agenda::with(['user', 'agendaRoomBookings.room']);

            if (!auth()->user()->can('room-request.confirm')) {
                $agendas->where('user_id', auth()->id());
            }

            $agendas = $agendas->latest()->get();
            
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
            $rooms = Room::get();
            return Inertia::render('agenda/create', compact('rooms'));
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
            'title' => 'required',
            'desc' => 'required',
            'agenda_room_bookings' => 'required|array',
            'file' => 'nullable|file|max:2048'
        ]);

        try {

            DB::transaction(function () use ($request) {
                $agenda = new Agenda();
                $agenda->user_id = auth()->id();
                $agenda->title = $request->title;
                $agenda->desc = $request->desc;
                $agenda->status = 'requested';
                $agenda->save();

                if ($request->hasFile('file')) {
                    $file = $request->file('file');
                    $filename = User::find(auth()->id())->name . '_' . time() . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('uploads/agenda_files/' . $agenda->id, $filename, 'public');
                    $agenda->update([
                        'file' => $filePath
                    ]);
                }

                foreach ($request->agenda_room_bookings as $booking) {
                    $item = new AgendaRoomBooking();
                    $item->agenda_id = $agenda->id;
                    $item->room_id = $booking['room_id'];
                    $item->start_datetime = $booking['start_datetime'];
                    $item->end_datetime = $booking['end_datetime'];
                    $item->save();
                }
            });

            return redirect()->route('agenda-rooms.index')->with('success', 'Agenda room request created successfully.');

        } catch (\Exception $e) {
             Log::error('Error creating agenda room request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create agenda room request.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $agenda = Agenda::with(['agendaRoomBookings.room', 'user'])->findOrFail($id);

            $this->authorize('view', $agenda);

            $agenda = [
                ...$agenda->toArray(),
                'file' => $agenda->file ? asset('storage/' . $agenda->file) : null
            ];

            return Inertia::render('agenda/show', compact('agenda'));
        } catch (\Exception $e) {
            Log::error('Error loading detail page: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load detail page.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $rooms = Room::get();
            $agenda = Agenda::with('agendaRoomBookings')->findOrFail($id);

            $this->authorize('update', $agenda);

            $agenda = [
                ...$agenda->toArray(),
                'file' => $agenda->file ? asset('storage/' . $agenda->file) : null
            ];

            return Inertia::render('agenda/edit', compact('agenda', 'rooms'));
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
        $request->validate([
            'title' => 'required',
            'desc' => 'required',
            'agenda_room_bookings' => 'required|array'
        ]);

        try {

            DB::transaction(function () use ($request, $id) {
                $agenda = Agenda::findOrFail($id);

                $this->authorize('update', $agenda);

                $agenda->title = $request->title;
                $agenda->desc = $request->desc;
                $agenda->save();

                if ($request->hasFile('file')) {

                    if ($agenda->file) {
                        Storage::disk('public')->delete($agenda->file);
                    }

                    $file = $request->file('file');
                    $filename = User::find(auth()->id())->name . '_' . time() . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('uploads/agenda_files/' . $agenda->id, $filename, 'public');
                    $agenda->update([
                        'file' => $filePath
                    ]);
                }

                $agenda_room_bookings = AgendaRoomBooking::where('agenda_id', $agenda->id)->pluck('id')->toArray();

                AgendaRoomBooking::forceDestroy($agenda_room_bookings);

                foreach ($request->agenda_room_bookings as $booking) {
                    $item = new AgendaRoomBooking();
                    $item->agenda_id = $agenda->id;
                    $item->room_id = $booking['room_id'];
                    $item->start_datetime = $booking['start_datetime'];
                    $item->end_datetime = $booking['end_datetime'];
                    $item->save();
                }
            });

            return redirect()->route('agenda-rooms.index')->with('success', 'Agenda room request updated successfully.');

        } catch (\Exception $e) {
             Log::error('Error updating agenda room request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update agenda room request.');
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required',
            'revision_note' => 'nullable'
        ]);

        try {

            DB::transaction(function () use ($request, $id) {
                $agenda = Agenda::findOrFail($id);
                $agenda->status = $request->status;
                if ($request->status === 'revision') {
                    $agenda->revision_note = $request->revision_note;
                }
                $agenda->save();
            });

            return redirect()->route('agenda-rooms.index')->with('success', 'Agenda room request updated successfully.');

        } catch (\Exception $e) {
             Log::error('Error updating agenda room request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update agenda room request.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $agenda = Agenda::findOrFail($id);

            $this->authorize('delete', $agenda);

            $agenda_room_bookings = AgendaRoomBooking::where('agenda_id', $id)->pluck('id')->toArray();

            AgendaRoomBooking::destroy($agenda_room_bookings);

            $agenda->delete();

            return redirect()->route('agenda-rooms.index')->with('success', 'Agenda room deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting agenda room request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete agenda room request.');
        }
    }
}
