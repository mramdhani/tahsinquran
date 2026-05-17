<?php

use App\Models\Surah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/surahs', function () {
    return Surah::all();
});

Route::get('/surahs/{id}', function ($id) {
    // Eager load seluruh relasi dalam satu hit database
    return Surah::with(['ayats.words.tajwids', 'ayats.words.sifatHurufs'])->findOrFail($id);
});
