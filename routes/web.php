<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::get('/checkpoint', function (Request $request) {
    return Inertia::render('Checkpoint', [
        'lat' => $request->lat,
        'lng' => $request->lng,
        'name' => $request->name,
    ]);
});
