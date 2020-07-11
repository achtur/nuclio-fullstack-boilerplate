<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    /**
     * Get the user that owns the board.
     * It says: One board belongs to a user
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the pins for the given board.
     * It says: One board has many pins
     */
    public function pins()
    {
        return $this->hasMany('App\Pin');
    }

    /**
     * The attributes that are mass assignable.
     *
     * The $fillable variable comes from Model. We define it here (it is empty there)
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'user_id',
    ];
}
