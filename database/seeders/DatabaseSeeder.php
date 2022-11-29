<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(2)->create();

        Schema::disableForeignKeyConstraints();

        \App\Models\User::truncate();
        \App\Models\Post::truncate();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);
        
        for($i = 1; $i < 40; $i++) {
            \App\Models\Post::create([
                'title' => "Test title $i",
                'content' => 'test content',
                'published_at' => \Carbon\Carbon::now(),
                'user_id' => 1,
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
