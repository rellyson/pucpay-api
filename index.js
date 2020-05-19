const { createConnection } = require("typeorm");
const { Server } = require('hapi');
const Routes = require('./src/routes.js');
require('dotenv').config();

const connectToDatabase = async (server) =>
  createConnection({
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    synchronize: true,
    username: process.env.DB_USERNAME,
    type: 'postgres',
    ssl: {
      "rejectUnauthorized": false
    },
    entities: [
      require("./src/model/Payment").Schema
    ]
  });

const init = async (port) => {
  console.log(`Starting on port ${port}`);

  const server = new Server({
    port: port,
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
  server.route(Routes);


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
