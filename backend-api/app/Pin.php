<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    /**
     * Get the board that owns the pin.
     * It says: One pin belongs to ONLY one board (we set this restriction)
     */
    public function board()
    {
        return $this->belongsTo('App\Board');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'note', 'color', 'media_url', 'board_id'
    ];
}
