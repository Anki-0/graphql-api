import {
  InputMaybe,
  PaginationInput
} from '../types/__generated__/resolvers-types.js';
import { __DEV__ } from '../utils/assertions.js';
import db from '../database/index.js';
import { userInputError } from './graphql-error.js';

interface FindAllTagsParams {
  where?: Record<string, any>;
  attributes?: string[];
  pagination?: InputMaybe<PaginationInput>;
}

interface FindAllTagsByUserParams extends FindAllTagsParams {
  user: { id: string; username?: string };
}

export const FIND_ALL_TAGS = async (params: FindAllTagsParams) => {
  const { attributes, pagination, where } = params;

  return await db.tag.findAll({
    where: where,
    attributes: attributes,
    offset: pagination?.offset ?? undefined,
    limit: pagination?.limit ?? undefined
  });
};

export const FIND_ALL_TAGS_BY_USER = async (
  params: FindAllTagsByUserParams
) => {
  const { user, ...options } = params;

  /**
   * Removing all those key whose value is not defined or null
   */
  Object.keys(user).forEach((key) => {
    if (user[key as keyof typeof user] === undefined) {
      delete user[key as keyof typeof user];
    }
  });

  return await db.tag.findAll({
    where: options.where,
    attributes: options.attributes,
    limit: options.pagination?.limit ?? undefined,
    offset: options.pagination?.offset ?? undefined,
    include: [
      {
        model: db.user,
        where: {
          ...user
        },
        attributes: [],
        through: { attributes: [] },
        required: true
      }
    ]
  });
};

export const GET_ALL_POPULAR_TAGS = async (
  attributes: string[],
  pagination: PaginationInput
) => {
  if (pagination.offset && !pagination.limit) {
    throw userInputError('You must define limit with offset!!');
  }

  return await db.tag.findAll({
    group: ['tag.id'],
    attributes: [
      ...attributes,
      [db.sequelize.literal('COUNT(DISTINCT posts.id)'), 'count']
    ],
    order: [['count', 'DESC']],
    limit: pagination.limit ?? undefined,
    offset: pagination.offset ?? undefined,
    raw: true, // Retrieve raw JSON data
    include: [
      {
        model: db.user,
        attributes: [],
        through: { attributes: [] },
        duplicating: false
      },
      {
        model: db.post,
        attributes: [],
        through: { attributes: [] },
        duplicating: false
      }
    ]
  });
};
