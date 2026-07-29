# Xiron

Offline-first fitness PWA for logging workouts and tracking strength progress. Built with vanilla JS on the frontend and PHP/MySQL on the backend, the app works fully offline using Service Workers and syncs data back to the server when connectivity returns. Handles 500+ queued entries without data loss through a custom conflict resolution system.

Auth is handled via JWT with email verification. The app is installable as a PWA, caches assets aggressively for instant load times, and uses a REST API for all data operations. Currently deployed at [xiron.cu.ma](https://xiron.cu.ma).

## Stack

JavaScript, PHP, MySQL, Service Workers, JWT, REST API

## Running locally

```bash
# Clone and set up the PHP backend
composer install
cp .env.example .env
# Configure your MySQL connection in .env
php artisan migrate
php artisan serve
```

Open `localhost:8000` in your browser. The PWA features (offline sync, install prompt) work best when served over HTTPS or on localhost.
