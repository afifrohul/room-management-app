<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Room;
use App\Models\AgendaRoomBooking;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        try {
            $rooms = Room::get();

            $filterRooms = $request->input('rooms', $rooms->pluck('id')->toArray());

            $schedule = AgendaRoomBooking::with(['agenda.user', 'room'])->whereHas('agenda', function ($query) {
                $query->where('status', 'approved');
            })->whereIn('room_id', $filterRooms)->get();

            $schedule = $schedule->map((function($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->agenda->user->name . '-' . $item->agenda->title,
                    'start' => $item->start_datetime,
                    'end' => $item->end_datetime,
                    'color' => $item->room->color,
                ];
            }));

            return Inertia::render('calendar/index', compact('rooms', 'schedule'));
        } catch (\Exception $e) {
            Log::error('Error loading calendar page: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load calendar page.');
        }
    }
}
