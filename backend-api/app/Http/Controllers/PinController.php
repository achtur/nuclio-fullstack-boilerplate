<?php

namespace App\Http\Controllers;

use App\Board;
use App\Pin;
use Exception;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PinController extends Controller
{

    /**
    // ASK Eudald - Auth en PINS y BOARDS - ciertos métodos?
    // TUTORIA - Auth en PINS y BOARDS - ciertos métodos?
    * "Podéis añadir esta parte (ABAJO) en vuestros otros controller para proteger ciertos métodos.
    * Probad de proteger el método de crear pins y boards!"

    */


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['']]);
    }



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
        Log::info('Retrieving pin with id: '.$id);
        $pin = Pin::findOrFail($id);
        return response()->json($pin);
    }

    /**
     * Return a collection of pins given a board id.
     *
     * @param $boardId
     * @return JsonResponse
     */
    public function getByBoard($boardId)
    {
        Log::info('Retrieving pins with board id: ' . $boardId);
        $pins = Pin::where('board_id', $boardId)->get();
        return response()->json($pins);
    }

    /**
     * Show a list of all of the pins matching the search.
     *
     * @param $query
     * @return JsonResponse
     * // FIXME: Esta función está deprecada. Se crea un SearchController y derivados instead:
     * SearchController.php
     * SearchPinServiceProvider.php
     * SearchPinService.php
     *
     * Comprovar que funcione esta antigua una vez cree de nuevo la DB y borrarla (?)
     * cuando la nueva del Search funcione
     */

    public function search($query)
    {
        Log::info('Retrieving all pins related to ->' .$query);
        $pins = Pin::where('note', 'LIKE', '%' . $query . '%')
            ->orWhere('description', 'LIKE', '%' . $query . '%')->get();
        // Same as:
        // $pins = DB::select('
        // SELECT * FROM pins
        // WHERE note LIKE ''
        // OR description LIKE '%green%'
        // ');

        Log::info('Retrieving query ->' . $pins);
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

        $body = $request->all();
        $pinValidator = Validator::make($body, [
            'note' => ['required', 'string', 'max:255'],
            'media_url' => ['required', 'string'],
            'board_id' => ['required', 'integer'],
        ]);

        if($pinValidator->fails()) {
            $errors = $pinValidator->errors()->getMessages();
            $code = Response::HTTP_NOT_ACCEPTABLE; // 406
            return response()->json(['error' => $errors, 'code' => $code], $code);
        }

        try {
            $board = Board::where('id', $request->board_id)->firstOrFail();
            $pin = Pin::create([
                'note' => $request->note,
                'description' => $request->description,
                'media_url' => $request->media_url,
                'board_id' => $board->id,
            ]);

            /** Después de crear el pin board, lo guarda en la DB */
            $pin->save();
            return response()->json(["Pin created and saved", $pin], 201);

        } catch (Exception $e) {
            $code = Response::HTTP_NOT_ACCEPTABLE;
            return response()->json(['error' => 'Board Id does not exist', 'code' => $code], $code);
        }
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


