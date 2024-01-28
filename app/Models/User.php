<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'password',
        'is_admin',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // all transation by this user
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // all current transation by this user
    // where is_count is equal to false
    public function currentTransactions()
    {
        return $this->transactions()->where('is_count', false);
    }

    // all paidable transation by this user
    public function paidableTransactions()
    {
        return $this->transactions()->where('is_count', true)->where('is_paid', false);
    }

    // all paid transation by this user
    // where is_paid is equal to false
    public function paidTransactions()
    {
        return $this->transactions()->where('is_paid', true);
    }

    public function paymentHistories()
    {
        return $this->hasMany(PaymentHistory::class);
    }
}
