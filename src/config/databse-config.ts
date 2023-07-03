export default {
  development: {
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    dialect: process.env.DATABASE_DILAECT as string
  },
  production: {
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    dialect: process.env.DATABASE_DILAECT as string
  }
};
