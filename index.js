const { createConnection } = require("typeorm");
const { Server } = require('hapi');
const Joi = require('Joi');
const Payment = require('./src/controller/Payment');

const connectToDatabase = async (server) =>
  createConnection({
    database: process.env.database,
    host: process.env.host,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    synchronize: true,
    username: process.env.USERNAME,
    type: 'postgres',
    ssl: {
      "rejectUnauthorized": false
    },
    entities: [
      require("./src/model/Payment").Schema
    ]
  });

const init = async (port) => {
  console.log(`Starting on port ${port || 3000}`);

  const server = new Server({
    host: "0.0.0.0",
    port: port || 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
      validate: {
        failAction: async (
          request,
          h,
          err
        ) => {
          if (err instanceof Error) {
            throw err;
          }
        },
      },
    },
  });

  server.realm.modifiers.route.prefix = "/pucpay";

  server.route("./src/routes.js");

  return server;
};

const start = async () => {
  const server = await init(undefined);

  server.app["connection"] = await connectToDatabase(server);
  console.info("Connected to database!");

  await server.start();
};

start()
  .then(() => {
    console.info("Ready to receive requests!");
  })
  .catch((err) => {
    console.log(err);
    console.info("Error starting server: ", err.message);
    process.exit(1);
  });