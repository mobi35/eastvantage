<?php

use App\Http\Controllers\Api\UserController;


Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
