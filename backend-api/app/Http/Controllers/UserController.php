<?php


namespace App\Http\Controllers;

use App\User;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;


class UserController extends Controller
{
    /**
     * Show a list of all of the application's users.
     *
     * @return JsonResponse
     */
    public function all()
    {
        Log::info('Retrieving all user profiles with corresponding boards');
        // $users = User::all();  ----> Same as: $users = DB::select('select * from users');
        $users = User::with('boards')->get();
        return response()->json($users);
        // return response()->json(User::with('boards')->get());
    }

    /**
     * Return a given user by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function getById($id)
    {
        Log::info('Retrieving user profile for user: '.$id);
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Return a given user by email.
     *
     * @param $email
     * @return JsonResponse
     */
    public function getByEmail($email)
    {
        Log::info('Retrieving user profile for user: '.$email);
        return response()->json(User::where('email', $email) -> first());
    }

    /**
     * Return a given user by username.
     *
     * @param $username
     * @return JsonResponse
     */
    public function getByUsername($username)
    {
        Log::info('Retrieving user profile for user: '.$username);
        return response()->json(User::where('username', $username) -> first());
    }

    /**
     * Create a new user instance.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        /**
         * Validate the request with Laravel VALIDATORS
         * Primero lo crea, lo guarda en una variable y
         * luego lo valida
         */

        $userValidator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255']
        ]);

        if($userValidator->fails()) {
            $errors = $userValidator->errors()->getMessages();
            $code = Response::HTTP_NOT_ACCEPTABLE; // 406
            return response()->json(['error' => $errors, 'code' => $code], $code);
        }

        $user = User::create([
            'email' => $request->email,
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'bio' => $request->bio,
            'password' => bcrypt($request->password),
        ]);

        $user->save();
        return response()->json(["User created", $user], 201);
    }

    /**
     * Update a given user by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->first();
        $dataFromUserToUpdate = $request->all();
        $user -> update($dataFromUserToUpdate);
        /*  return response()->json($user); */
        return response()->json(["User updated", $user], 200);
    }

    /**
     * Delete a given user by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        $user = User::where('id', $id)->first();
        $user -> delete();
        return response()->json('Deleting user with id: ' . $id);
    }
}
