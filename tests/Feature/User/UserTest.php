<?php

use App\Models\User;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\get;
use function Pest\Laravel\post;


test('user list works', function () {

    User::factory()->times(20)->create();
    $fetch = get('/api/users');
    assertDatabaseCount('users', 20);
});

test('user store works', function () {

    $fetch = post('/api/users', [
        'first_name' => 'Adrian',
        'last_name' => 'Radores',
        'email' => 'test@yahoo.com',
        'roles' => [
            'Author',
            'Editor',
        ]
    ]);

    /* assertDatabaseCount('users', 20); */
});
