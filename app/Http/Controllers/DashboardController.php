<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['currentTransactions'] = auth()->user()->currentTransactions()->latest()->paginate(20)->onEachSide(1)->withQueryString();

        return Inertia::render('Dashboard', $data);
    }
}
