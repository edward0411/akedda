<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $mensaje = DB::table('mensajes')->first();
        return view('home.index', compact('mensaje'));
    }
}
