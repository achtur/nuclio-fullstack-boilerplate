<?php

namespace App\Http\Controllers;

use App\Services;
use App\Pin;

class SearchPinService
{
    /**
     * Returns a list of all the pins that match the search
     *
     * @param $query
     * @return array
     */
    public function search($query)
    {
        Log::info('Retrieving all pins related to ->' .$query);
        return Pin::where('note', 'LIKE', '%' . $query . '%')
            ->orWhere('description', 'LIKE', '%' . $query . '%')->get();
        // Same as:
        // $pins = DB::select('
        // SELECT * FROM pins
        // WHERE note LIKE ''
        // OR description LIKE '%green%'
        // ');
    }

}


