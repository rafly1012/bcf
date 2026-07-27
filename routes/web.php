<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::get('/check-point', function (Request $request) {
    return Inertia::render('check-point', [
        'lat' => $request->lat,
        'lng' => $request->lng,
        'name' => $request->name,
    ]);
});
