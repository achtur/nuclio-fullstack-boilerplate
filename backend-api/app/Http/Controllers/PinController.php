<?php

namespace App\Http\Controllers;

use App\Pin;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class PinController extends Controller
{
    /**
     * Show a list of all of the application's pins.
     *
     * @return JsonResponse
     */
    public function all()
    {
        Log::info('Retrieving all pins');
        $pins = Pin::all();         // Same as: $pins = DB::select('select * from pins');
        return response()->json($pins);
    }

    /**
     * Return a given pin by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function getById($id)
    {
        Log::info('Retrieving pin profile for pin with id: '.$id);
        $pin = Pin::findOrFail($id);
        return response()->json($pin);
    }

    /**
     * Return a collection of pins given a board id.
     *
     * @param $boardId
     * @return JsonResponse
     */
    public function GetByBoard($boardId)
    {
        Log::info('Retrieving pins with board id: ' . $boardId);
        $pins = Pin::where('board_id', $boardId)->get();
        return response()->json($pins);
    }

    /**
     * Create a new pin instance.
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

        $pinValidator = Validator::make($request->all(), [
            'note' => ['required', 'string', 'max:255'],
            'media_url' => ['required', 'url'],
            'board_id' => ['required', 'integer'],
        ]);

        if($pinValidator->fails()) {
            $errors = $pinValidator->errors()->getMessages();
            $code = Response::HTTP_NOT_ACCEPTABLE; // 406
            return response()->json(['error' => $errors, 'code' => $code], $code);
        }

        $pin = Pin::create([
            'note' => $request->note,
            'color' => $request->color,
            'media_url' => $request->media_url,
            'board_id' => $request->board_id,
        ]);

        $pin->save();
        return response()->json(["Pin created", $pin], 201);
    }

    /**
     * Update a given pin by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        /* Eudald la formula així i funciona */

        $pin = Pin::where('id', $id)->first();
        $dataFromPinToUpdate = $request->all();
        $pin -> update($dataFromPinToUpdate);
    /*  return response()->json($pin); */
        return response()->json(["Pin updated", $pin], 200);
    }

    /**
     * Delete a given pin by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        /* Eudald la formula així i funciona */

        $pin = Pin::where('id', $id)->first();
        $pin -> delete();
        return response()->json('Deleting pin with id: ' . $id);
    }
}


