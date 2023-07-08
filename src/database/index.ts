import { highlight } from 'cli-highlight';
import { Sequelize, DataTypes, type Dialect } from 'sequelize';

import config from '../config/database-config.js';
import { __DEV__, __PRODUCTION__ } from '../utils/assertions.js';

/**MODEL IMPORT */
import {
  userModel,
  accountModel,
  clapModel,
  commentModel,
  followerModel,
  tagsModel,
  postModel,
  post_tag_junctionModel,
  user_tag_junctionModel,
  verificationTokenModel
} from './models/index.js';

let sequelize: Sequelize;

if (__DEV__ === undefined || __PRODUCTION__ === undefined) {
  throw Error(
    'The application encountered an error while attempting to access the NODE_ENV environment variable. The variable is either not set or not accessible within the current context.'
  );
}

if (__DEV__) {
  const { database, username, password, host, dialect } = config['development'];
  sequelize = new Sequelize(database, username, password, {
    logging(log) {
      console.log(highlight(log, { language: 'mysql', ignoreIllegals: true }));
    },
    host: host,
    dialect: dialect as Dialect
  });
} else {
  const { database, username, password, host, dialect } = config['production'];
  sequelize = new Sequelize(database, username, password, {
    logging: false,
    host: host,
    dialect: dialect as Dialect
  });
}

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  user: userModel(sequelize, DataTypes),
  account: accountModel(sequelize, DataTypes),
  clap: clapModel(sequelize, DataTypes),
  comment: commentModel(sequelize, DataTypes),
  follower: followerModel(sequelize, DataTypes),
  tag: tagsModel(sequelize, DataTypes),
  post: postModel(sequelize, DataTypes),
  posts_tags_junction: post_tag_junctionModel(sequelize, DataTypes),
  users_tags_junction: user_tag_junctionModel(sequelize, DataTypes),
  verificationTokens: verificationTokenModel(sequelize, DataTypes)
};

Object.keys(db).forEach((modelName) => {
  if (modelName === 'sequelize' || modelName === 'Sequelize') {
    return;
  }

  if (db[modelName as keyof Omit<typeof db, 'sequelize' | 'Sequelize'>].associate !== undefined) {
    db[modelName as keyof Omit<typeof db, 'sequelize' | 'Sequelize'>].associate(db);
  }
});

export default db;
