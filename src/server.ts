import http from 'http';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@apollo/server/express4';

import app from './app.js';
import db from './database/index.js';
import schema from './graphql/schema.js';
import { Context, context } from './graphql/context.js';

(async () => {
  const httpServer = http.createServer(app);

  // ApolloServer initialization
  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  });

  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/',
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req, res }) => context({ req, res })
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  ).then(async () => {
    await db.sequelize
      .sync({
        // force: true
        // alter: true
      })
      .then(() => console.log(`🚀 Database ready at URL `));
  });

  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
