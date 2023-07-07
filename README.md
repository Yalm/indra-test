### Prerequisites

- Node 16
- Mysql 8
- Serverless

### Installation

1. Install the serverless CLI via NPM:
   ```sh
   npm install -g serverless
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Rename or copy the `.env.dev` file to `.env`
1. Set your database credentials in your `.env` file
1. Create the database and table with the following script
   ```sh
      CREATE DATABASE  IF NOT EXISTS `indra`
      USE `indra`;
      CREATE TABLE `products` (
         `id` int NOT NULL AUTO_INCREMENT,
         `name` varchar(250) DEFAULT NULL,
         `description` varchar(250) DEFAULT NULL,
         PRIMARY KEY (`id`)
      )
   ```

## Running the app

```bash
# development
$ npm run start
```

## Generate Open API

```bash
# development
$ serverless openapi generate
```

## Build the app

```bash
# development
$ npm run sls:package
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
