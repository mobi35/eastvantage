<?php

namespace Database\Seeders;

use App\Models\Role;
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

        Role::factory()->create([
          'name' => 'Author',
        ]);

        Role::factory()->create([
          'name' => 'Editor',
        ]);

        $subscriber = Role::factory()->create([
          'name' => 'Subscriber',
        ]);

        Role::factory()->create([
          'name' => 'Administrator',
        ]);

        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $user->roles()->sync([$subscriber->id]);
    }
}
