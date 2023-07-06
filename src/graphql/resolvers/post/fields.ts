import { GraphQLError } from 'graphql';
import graphqlFields from 'graphql-fields';
import { Resolvers, User } from '../../../types/__generated__/resolvers-types.js';

export const PostFields: Resolvers = {
  Post: {
    publishedBy: async (prev: any, _: any, { loaders }: any, info: any) => {
      const _fields = Object.keys(
        graphqlFields(info, {}, { processArguments: true, excludedFields: ['__typename'] })
      );

      if (!prev.publishedBy) {
        throw new GraphQLError('Published by field can not be null or undefined!');
      }

      return (await loaders.userByIdLoader.load({
        key: prev.publishedBy as unknown as string,
        fields: _fields as (keyof Omit<User, '__typename'>)[]
      })) as User;
    }
  }
};
