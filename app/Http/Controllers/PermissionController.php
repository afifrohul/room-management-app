<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $permissions = Permission::select('id', 'name', 'created_at', 'updated_at')->orderBy('created_at', 'desc')->orderBy('name', 'asc')->get();
            return Inertia::render('permission/index', compact('permissions'));
        } catch (\Exception $e) {
            Log::error('Error loading permissions: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load permissions.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('permission/create');
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
            'name' => 'required|unique:permissions,name',
        ]);
        
        try {
            Permission::create($request->only('name'));
            return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating permission: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create permission.');
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
            $permission = Permission::findOrFail($id);
            return Inertia::render('permission/edit', compact('permission'));
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
            'name' => 'required|unique:permissions,name',
        ]);
        
        try {
            $permission = Permission::findOrFail($id);
            $permission->update($request->only('name'));
            return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating permission: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update permission.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $permission = Permission::findOrFail($id);
            $permission->delete();
            return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting permission: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete permission.');
        }
    }
}
