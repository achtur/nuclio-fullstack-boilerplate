<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Pin extends Authenticatable implements JWTSubject
//class Pin extends Model
{

    /* // ASK - Això només a User.php o aquí també? */


    use Notifiable;

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
















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
        'note', 'description', 'media_url', 'board_id'
    ];
}
