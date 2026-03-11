<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\AgendaController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('calendar', [CalendarController::class, 'index'])->name('calendar');

    Route::group(['middleware' => ['permission:permission.view']], function () {
        Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    });
    Route::group(['middleware' => ['permission:permission.create']], function () {
        Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
        Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
    });
    Route::group(['middleware' => ['permission:permission.update']], function () {
        Route::get('/permissions/{id}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
        Route::put('/permissions/{id}', [PermissionController::class, 'update'])->name('permissions.update');
    });
    Route::group(['middleware' => ['permission:permission.delete']], function () {
        Route::delete('/permissions/{id}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
    });

    Route::group(['middleware' => ['permission:role.view']], function () {
        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    });
    Route::group(['middleware' => ['permission:role.create']], function () {
        Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    });
    Route::group(['middleware' => ['permission:role.update']], function () {
        Route::get('/roles/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit');
        Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update');
    });
    Route::group(['middleware' => ['permission:role.delete']], function () {
        Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
    });

    Route::group(['middleware' => ['permission:user.view']], function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
    });
    Route::group(['middleware' => ['permission:user.create']], function () {
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
    });
    Route::group(['middleware' => ['permission:user.update']], function () {
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    });
    Route::group(['middleware' => ['permission:user.delete']], function () {
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    Route::group(['middleware' => ['permission:room.view']], function () {
        Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/rooms/{id}/show', [RoomController::class, 'show'])->name('rooms.show');
    });
    Route::group(['middleware' => ['permission:room.create']], function () {
        Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
        Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
    });
    Route::group(['middleware' => ['permission:room.update']], function () {
        Route::get('/rooms/{id}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/rooms/{id}', [RoomController::class, 'update'])->name('rooms.update');
    });
    Route::group(['middleware' => ['permission:room.delete']], function () {
        Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy');
    });

    Route::group(['middleware' => ['permission:room-request.view']], function () {
        Route::get('/agenda-rooms', [AgendaController::class, 'index'])->name('agenda-rooms.index');
        Route::get('/agenda-rooms/{id}/show', [AgendaController::class, 'show'])->name('agenda-rooms.show');
    });
    Route::group(['middleware' => ['permission:room-request.create']], function () {
        Route::get('/agenda-rooms/create', [AgendaController::class, 'create'])->name('agenda-rooms.create');
        Route::post('/agenda-rooms', [AgendaController::class, 'store'])->name('agenda-rooms.store');
    });
    Route::group(['middleware' => ['permission:room-request.update']], function () {
        Route::get('/agenda-rooms/{id}/edit', [AgendaController::class, 'edit'])->name('agenda-rooms.edit');
        Route::put('/agenda-rooms/{id}', [AgendaController::class, 'update'])->name('agenda-rooms.update');
    });
    Route::group(['middleware' => ['permission:room-request.confirm']], function () {
        Route::put('/agenda-rooms/{id}/update-status', [AgendaController::class, 'updateStatus'])->name('agenda-rooms.update-status');
    });
    Route::group(['middleware' => ['permission:room-request.delete']], function () {
        Route::delete('/agenda-rooms/{id}', [AgendaController::class, 'destroy'])->name('agenda-rooms.destroy');
    });

});

require __DIR__.'/settings.php';
