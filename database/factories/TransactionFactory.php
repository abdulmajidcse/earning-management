<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();

        return [
            'user_id' => $userIds[array_rand($userIds)],
            'sent_from_email' => fake()->email(),
            'amount' => fake()->randomFloat(null, 0.2, 50),
            'sent_at' => now(),
        ];
    }
}
