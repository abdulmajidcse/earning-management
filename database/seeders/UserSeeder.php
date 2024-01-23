<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create admin
        User::factory()->create([
            'email' => 'admin@gmail.com',
            'mobile' => '01700000000',
            'is_admin' => 1,
        ]);

        // create general user
        User::factory(200)->create();
    }
}
