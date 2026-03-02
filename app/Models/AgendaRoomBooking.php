<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgendaRoomBooking extends Model
{
    use SoftDeletes;

    public function agenda()
    {
        return $this->belongsTo(Agenda::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
