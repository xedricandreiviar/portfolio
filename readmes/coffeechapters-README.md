# Coffee Chapters

Full-stack ordering platform built for a Philippine coffee shop. Covers the whole flow: menu browsing, cart, order placement, GCash/Maya payment verification, and an admin dashboard with sales analytics. The tax calculation handles BIR-compliant VAT with cascading Senior Citizen and PWD discount rules — getting that logic right took longer than the rest of the checkout combined.

Built with PHP and MySQL on the backend, JavaScript and Tailwind CSS on the frontend. Currently live at [coffeechapters.freedev.app](https://coffeechapters.freedev.app).

## Stack

PHP, MySQL, JavaScript, Tailwind CSS

## Running locally

```bash
# Set up the backend
composer install
cp .env.example .env
# Configure MySQL credentials in .env
php artisan migrate --seed
php artisan serve
```

The seed data includes sample menu items and test accounts. Admin panel is at `/admin`.
