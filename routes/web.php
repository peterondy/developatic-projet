<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Http\Controllers\HomeController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function(){
    $users = DB::select('select * from users');
    return Inertia::render('Dashboard',[
        'users'=> User::all(),
    ]);
});//->middleware('auth');
Route::get('/edit', function(){
    $users = DB::select('select * from users');
    return Inertia::render('Edit',[
        'users'=> User::all(),
    ]);
})->middleware('auth');
Route::get('/dashboard/user/{id}/delete', [App\Http\Controllers\UserController::class, 'destroy'])->name('delete')->middleware('auth');
Route::get('/dashboard/user/{id}/edit', [App\Http\Controllers\UserController::class, 'edit'])->name('edit')->middleware('auth');




Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/multiple',[App\Http\Controllers\Auth\RegisterController::class, 'multiple'])->name('multiple')->middleware('auth');
Route::get('/register',[App\Http\Controllers\Auth\RegisterController::class, 'show'])->name('register');
Route::get('/register/{params}',[App\Http\Controllers\UserController::class, 'store'])->name('store');
Route::post('/register/{params}',[App\Http\Controllers\UserController::class, 'store'])->name('store');


Route::group(['middleware' => ['auth']], function() {
    Route::get('/logout', 'use App\Http\Controllers\HomeController@perform')->name('logout.perform');
});
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
