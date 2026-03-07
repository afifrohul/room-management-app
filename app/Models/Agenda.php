<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{
    use SoftDeletes;

    protected $fillable = ['file'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agendaRoomBookings()
    {
        return $this->hasMany(AgendaRoomBooking::class);
    }
}
