<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['users'] = User::withSum('currentTransactions', 'amount')->latest()->paginate(20)->onEachSide(1)->withQueryString();

        return Inertia::render('Auth/User/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'mobile' => ['required', 'numeric', 'digits:11', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $validateData['password'] = Hash::make($request->password);

        $user = User::create($validateData);

        event(new Registered($user));

        return redirect()->route('users.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $data['user'] = $user->loadSum('currentTransactions', 'amount');

        return Inertia::render('Auth/User/Show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $data['user'] = $user;

        return Inertia::render('Auth/User/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validateData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'mobile' => ['required', 'numeric', 'digits:11', Rule::unique(User::class)->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        if (array_key_exists('password', $validateData) && !empty($validateData['password'])) {
            $validateData['password'] = Hash::make($request->password);
        } else {
            unset($validateData['password']);
        }

        $user->update($validateData);

        return redirect()->route('users.edit', $user->id);
    }

    /**
     * Change the user is_active status
     */
    public function changeStatus(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
