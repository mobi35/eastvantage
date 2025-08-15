# README

Make sure you have php version 8+

Run the following commands

`composer install`

`cp .env.example .env`

`./vendor/bin/sail up -d`

note: wait for a couple of seconds for mysql server to start.

`./vendor/bin/sail artisan migrate --seed`

`./vendor/bin/sail npm i`

`./vendor/bin/sail npm run dev`

go to localhost to check the site


