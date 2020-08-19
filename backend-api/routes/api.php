<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
|--------------------------------------------------------------------------
| User Routes - en Picturest NO TIENEN SENTIDO... USAREMOS LAS DE AUTH
|--------------------------------------------------------------------------
*/

/* get */
Route::get('users', 'UserController@all');
Route::get('users/{id}', 'UserController@getById');
Route::get('users/email/{email}', 'UserController@getByEmail');
Route::get('users/username/{username}', 'UserController@getByUsername');
/* post - create user */
Route::post('users', 'UserController@create');
/* put - update user by id */
Route::put('users/{id}', 'UserController@update');
/* delete - delete user by id */
Route::delete('users/{id}', 'UserController@delete');

/*
|--------------------------------------------------------------------------
| Board Routes
|--------------------------------------------------------------------------
*/

/* get */
Route::get('boards', 'BoardController@all');
Route::get('boards/{id}', 'BoardController@getById');
Route::get('boards/user/{userId}', 'BoardController@getByUser');
/* post - create board */
Route::post('boards', 'BoardController@create');
/* put - update board by id */
Route::put('boards/{id}', 'BoardController@update');
/* delete - delete board by id */
Route::delete('boards/{id}', 'BoardController@delete');

/*
|--------------------------------------------------------------------------
| Pin Routes
|--------------------------------------------------------------------------
*/

/* get */
Route::get('pins', 'PinController@all');
Route::get('pins/{id}', 'PinController@getById');
Route::get('pins/board/{boardId}', 'PinController@getByBoard');
/* post - create pin */
Route::post('pins', 'PinController@create');
/* put - update pin by id */
Route::put('pins/{id}', 'PinController@update');
/* delete - delete pin by id */
Route::delete('pins/{id}', 'PinController@delete');



/*
Route::group([

    'middleware' => 'api',
    'prefix' => 'pins'

], function ($router) {

    Route::get('', 'PinController@all');
    Route::get('{id}', 'PinController@getById');
    Route::get('board/{boardId}', 'PinController@getByBoard');
    Route::post('', 'PinController@create');
    Route::put('{id}', 'PinController@update');
    Route::delete('{id}', 'PinController@delete');
});
*/





/*
|--------------------------------------------------------------------------
| Generic Routes
|--------------------------------------------------------------------------
*/

/* get */ //TODO - Are these really generic routes... should there be only ONE search route for P and B?
Route::get('pins/search/{query}', 'PinController@search');
Route::get('boards/search/{query}', 'BoardController@search');


/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

/*
 localhost/api/auth/login
 */

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

// TUTORIA - /auth/me - POST?? No GET?




