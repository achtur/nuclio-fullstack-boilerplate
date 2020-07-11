<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Validator;
use App\Board;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BoardController extends Controller
{
    /**
     * Show a list of all of the application's boards.
     *
     * @return JsonResponse
     */
    public function all()
    {
        Log::info('Retrieving all boards with corresponding pins');
        return response()->json(Board::with('pins')->get());
    }

    /**
     * Return a given board by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function getById($id)
    {
        Log::info('Retrieving board with id: '.$id);
        return response()->json(Board::findOrFail($id));
    }

    /**
     * Return a collection of boards given a user id.
     *
     * @param $userId
     * @return JsonResponse
     */
    public function getByUser($userId)
    {
        Log::info('Retrieving boards with user id: '.$userId);
        $boards = Board::where('user_id', $userId)->get();
        return response()->json($boards);
    }

    /**
     * Create a new board instance.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        /**
         * Validate the request with Laravel VALIDATORS
         * Primero lo crea, lo guarda en una variable y
         * luego lo valida
         */

        $body = $request->all();
        $boardValidator = Validator::make($body, [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'integer'],
        ]);

        if($boardValidator->fails()) {
            $errors = $boardValidator->errors()->getMessages();
            $code = Response::HTTP_NOT_ACCEPTABLE; // 406
            return response()->json(['error' => $errors, 'code' => $code], $code);
        }

        $board = Board::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $request->user_id,
        ]);

        /** Después de crear la board, la guarda en la DB */
        $board->save();
        return response()->json(["Board created", $board], 201);
    }

    /**
     * Update a given board by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        /* Eudald la formula així i funciona */

        $board = Board::where('id', $id)->first();
        $dataFromBoardToUpdate = $request->all();
        $board -> update($dataFromBoardToUpdate);
        /*  return response()->json($board); */
        return response()->json(["Board updated", $board], 200);
    }

    /**
     * Delete a given board by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        /* Eudald la formula així i funciona */

        $board = Board::where('id', $id)->first();
        $board -> delete();
        return response()->json('Deleting board with id: ' . $id);
    }
}
