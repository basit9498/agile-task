# Agile Task APIs APP

## Prerequisites Instructions

### Install:

    * Node js v18.14.2
    * NPM v9.5.0
    * pm2

## Install Dependencies

    * Run `npm install` to install all dependencies.

## Run DB migrations

    * For add modal migrate
    * `npx sequelize-cli model:generate --name table_name --attributes colum:string --models-path src/Modules/folderName/entities --migrations-path src/database/migrations`

## Run APP

    $ node server.js
