import graphqlFields from 'graphql-fields';

import {
  OrderByFilter,
  Post,
  PostStatus,
  QueryResolvers
} from '../../../types/__generated__/resolvers-types.js';
import { GraphQLError } from 'graphql';
import { ResolveWhereFilter } from '../../../utils/database.js';
import { FIND_POSTS, FIND_POSTS_WITH_TAGS } from '../../../lib/postsQueries.js';
import { Op, where } from 'sequelize';

// Demo user
// const auth = {
//   isUserLogged: true,
//   currentUser: {
//     id: '127d6716-df7f-462c-b2a7-68d2da383a91',
//     role: 'admin'
//   }
// };

export const PostQueries: QueryResolvers = {
  posts: async (_, { input, pagination }, { db, auth }, info) => {
    let orderByFilter: (string | undefined | null)[][] = [];
    const whereFilter = ResolveWhereFilter(input?.where ?? {});

    /** Selected Fields */
    const fields = Object.keys(
      graphqlFields(
        info,
        {},
        { processArguments: true, excludedFields: ['__typename'] }
      ).data
    );

    /**
     * making sure that private and draft post are only accessable by authorised users.
     */
    if (input?.where) {
      const { status, publishedBy } = input.where;

      if (
        status?._eq === 'private' ||
        status?._eq === 'draft' ||
        status?._in?.includes(PostStatus['Private'] || PostStatus['Draft'])
      ) {
        if (!auth.isUserLoggedIn) {
          throw new GraphQLError(
            'To able to see private and draft posts, Please login.',
            {
              extensions: {
                code: 'ACCESS_DENIED'
              }
            }
          );
        }

        /**
         * if user is filtering `private` or `draft` post for the specific user,
         * we must not allow his to do so unless, he/she is authorized.
         */
        if (publishedBy && publishedBy !== auth.user?.id) {
          throw new GraphQLError(
            'You are not permitted to see privated and draft post of other users.',
            {
              extensions: {
                code: 'ACCESS_DENIED'
              }
            }
          );
        } else {
          if (!publishedBy && auth.isUserLoggedIn) {
            Object.assign(
              whereFilter,
              ResolveWhereFilter({
                ...input.where,
                _or: [
                  { status: { _eq: 'published' } },
                  {
                    publishedBy: auth.user?.id
                  }
                ]
              })
            );
          }
        }
      }
    }
    /**
     * creating orderByFilter allowing user to sort post with createdAt and updatedAt
     */
    if (input?.orderBy) {
      const { orderBy } = input;

      orderByFilter = Object.keys(orderBy).map((key) => [
        key,
        orderBy[key as keyof OrderByFilter]
      ]);

      if (orderBy.createdAt && !fields.includes('createdAt')) {
        fields.push('createdAt');
      }
      if (orderBy.updatedAt && !fields.includes('updatedAt')) {
        fields.push('updatedAt');
      }
    }

    /**
     * Quering all post with their tags.
     */
    if (fields.includes('tags')) {
      const Posts = await FIND_POSTS_WITH_TAGS({
        whereFilter: whereFilter,
        sortFilter: orderByFilter,
        pagination,
        attributes: fields.filter((attr) => attr !== 'tags')
      });

      return {
        data: [...Posts] as unknown as [Post],
        pagination: {
          hasNextPage: Posts.length !== 0 ? true : false,
          hasPrevPage: (pagination?.offset as number) > 0 ? true : false
        }
      };
    }

    /**
     * Quering all post wihout any association.
     */
    const Posts = await FIND_POSTS({
      whereFilter: whereFilter,
      sortFilter: orderByFilter,
      attributes: fields,
      pagination
    });

    return {
      data: Posts as unknown as Post[],
      pagination: {
        hasNextPage: Posts.length !== 0 ? true : false,
        hasPrevPage: (pagination?.offset as number) > 0 ? true : false
      }
    };
  }
};
