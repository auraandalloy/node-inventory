# Node Inventory API

## Developer Scripts

Here are some helpful scripts to manage the database during development:

### Insert Dummy Inventory Data

To insert a single dummy inventory item into the database for testing purposes, run:

`node scripts/insert-dummy-inventory.js`

Every time you run this script, it generates a unique ID (using `Date.now()`) to prevent primary key collisions. You can run it as many times as you need to populate your local database with test items.

### Database Migrations

This project uses Sequelize to manage database schema changes. To run all pending migrations and update your database, run:

`npx sequelize-cli db:migrate`

If you need to rollback the most recent migration, run:

`npx sequelize-cli db:migrate:undo`

To rollback *all* migrations, you can run:

`npx sequelize-cli db:migrate:undo:all`

### Database Seeding

To populate the database with initial required data (such as default categories), run the seeders:

`npx sequelize-cli db:seed:all`

To undo all seeded data, run:

`npx sequelize-cli db:seed:undo:all`