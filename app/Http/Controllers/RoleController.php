<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Role;
use App\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $roles = Role::with(['permissions:id,name'])->select('id', 'name', 'created_at', 'updated_at')->get();

            $roles = $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'created_at' => $role->created_at,
                    'updated_at' => $role->updated_at,
                    'permissions' => $role->permissions?->pluck('name')->toArray()
                ];
            });

            return Inertia::render('role/index', compact('roles'));
        } catch (\Exception $e) {
            Log::error('Error loading roles: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load roles.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            $permissions = Permission::select('id', 'name as label', 'name as value')->get();
            return Inertia::render('role/create', compact('permissions'));
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
            'name' => ['required', Rule::unique('roles')->whereNull('deleted_at')],
            'permissions' => 'nullable'
        ]);
        
        try {
            $role = Role::create($request->only('name'));
            $role->givePermissionTo($request->permissions);

            return redirect()->route('roles.index')->with('success', 'Role created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating role: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create role.');
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
        try {
            $permissions = Permission::select('id', 'name as label', 'name as value')->get();
            $role = Role::with('permissions:id,name')->findOrFail($id);

            $role = [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->toArray()
            ];

            return Inertia::render('role/edit', compact('role', 'permissions'));
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
            'name' => ['required', Rule::unique('roles')->whereNull('deleted_at')->ignore($id)],
            'permissions' => 'nullable'
        ]);
        
        try {
            $role = Role::findOrFail($id);
            $role->update($request->only('name'));
            $role->syncPermissions($request->permissions);

            return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating role: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update role.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();
            return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting role: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete role.');
        }
    }
}
