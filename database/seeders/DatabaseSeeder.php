<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
        'nombre_usuario' => 'cesped',
        'email' => 'a@a',
        'password' => bcrypt('a'),
        'rol' => 'admin',
        ]);
        
        User::factory()->create([
        'nombre_usuario' => 'cesped25',
        'email' => 'b@b',
        'password' => bcrypt('b'),
        'rol' => 'usuario',
        ]);
    }
}
