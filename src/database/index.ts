import { highlight } from 'cli-highlight';
import { Sequelize, DataTypes, Op, type Dialect } from 'sequelize';

import config from '../config/database-config.js';
import { __DEV__ } from '../utils/assertions.js';

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

let db = {
  Op: Op,
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
  const name = modelName as keyof typeof db;
  if (name !== 'Sequelize' && name !== 'sequelize' && name !== 'Op' && db[name].associate !== undefined) {
    db[name].associate(db);
  }
});

export default db;
