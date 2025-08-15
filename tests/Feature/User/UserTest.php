<?php

use App\Models\User;
use function PHPUnit\Framework\assertEquals;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;


test('user list works', function () {

    User::factory()->times(20)->create();
    $fetch = get('/api/users');
    assertDatabaseCount('users', 20);
});

test('user store works', function () {

    $post = post('/api/users', [
        'first_name' => 'Adrian',
        'last_name' => 'Radores',
        'email' => 'test@yahoo.com',
        'roles' => [
            'Author',
            'Editor',
        ]
    ]);


    assertEquals(User::first()->first_name, 'Adrian');
    assertEquals(User::first()->last_name, 'Radores');
});


test('user store email validation', function () {

    $response = post('/api/users', [
        'first_name' => 'Adrian',
        'last_name' => 'Radores',
        'email' => '',
        'roles' => ['Author', 'Editor'],
    ]);
    $response->assertSessionHasErrors(['email' => 'The email field is required.']);

    $response = post('/api/users', [
        'first_name' => 'Adrian',
        'last_name' => 'Radores',
        'email' => 'not-an-email',
        'roles' => ['Author', 'Editor'],
    ]);
    $response->assertSessionHasErrors(['email' => 'The email field must be a valid email address.']);

    $existingUser = User::factory()->create(['email' => 'existing@example.com']);

    $response = post('/api/users', [
        'first_name' => 'Adrian',
        'last_name' => 'Radores',
        'email' => 'existing@example.com',
        'roles' => ['Author', 'Editor'],
    ]);

    $response->assertSessionHasErrors(['email' => 'The email has already been taken.']);
});
