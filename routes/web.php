<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::view('/dashboard', 'dashboard');

Route::view('/login', 'auth.login')->name('login');

Route::view('/register', 'auth.register')->name('register');

//Con el registrer