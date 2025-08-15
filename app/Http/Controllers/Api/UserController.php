<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{

    public function index(): JsonResponse
    {
        try {

            return response()->json([
                'success' => true,
                'data' => UserResource::collection(User::with('roles')->orderByDesc('created_at')->get())
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function store(Request $request): JsonResponse
    {

        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|string|email|max:255|unique:users,email',
            'roles' => 'required|array|min:1',
        ]);

        try {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
            ]);

            $roleIds = [];
            foreach ($data['roles'] ?? [] as $roleName) {
                $role = Role::firstOrCreate(['name' => $roleName]);
                $roleIds[] = $role->id;
            }

            $user->roles()->sync($roleIds);

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => $user->load('roles')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
