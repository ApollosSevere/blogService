const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;

// const Sequelize = require("sequelize");
// const pkg = require("../../package.json");

// const databaseName =
//   pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

// const config = {
//   logging: false,
// };

// const dbConfig = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "1234",
//   DB: "issuetracker",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
// if (process.env.LOGGING === "true") {
//   delete config.logging;
// }

// //https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
// if (process.env.DATABASE_URL) {
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }

// // const db = new Sequelize(
// //   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
// //   config
// // );

// const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   logging: false,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
// module.exports = db;
