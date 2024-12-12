<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FirebaseAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/register', [FirebaseAuthController::class, 'register']);
Route::post('/login', [FirebaseAuthController::class, 'login']);
Route::post('/logout', [FirebaseAuthController::class, 'logout']);
Route::post('/create-token', [FirebaseAuthController::class, 'createCustomToken']);
Route::post('/verify-token', [FirebaseAuthController::class, 'verifyToken']);
Route::post('/logout', [FirebaseAuthController::class, 'logout']);
Route::post('/verify-revoked-token', [FirebaseAuthController::class, 'verifyRevokedToken']);

require __DIR__.'/auth.php';
