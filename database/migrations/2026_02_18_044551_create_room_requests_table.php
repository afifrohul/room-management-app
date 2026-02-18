<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('room_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('room_id');
            $table->string('room_name');
            $table->datetime('datetime');
            $table->string('file')->nullable();
            $table->enum('status', ['draft', 'requested', 'approved', 'rejected', 'revision']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_requests');
    }
};
