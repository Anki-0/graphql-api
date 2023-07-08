import graphqlFields from 'graphql-fields';
import {
  PopularTagsResponse,
  QueryResolvers,
  Tag
} from '../../../types/__generated__/resolvers-types.js';
import {
  FIND_ALL_TAGS,
  FIND_ALL_TAGS_BY_USER,
  GET_ALL_POPULAR_TAGS
} from '../../../lib/tagQueries.js';

export const TagQueries: QueryResolvers = {
  tags: async (_, { input, pagination }, { db }, info) => {
    let { userid, username, ...whereFilter } = {
      ...input?.where
    };

    /**
     * updating where filter key.
     */
    if (input?.where && Object.keys(input.where).includes('tagname' || 'id')) {
      Object.assign(whereFilter, { tag_name: input.where.tagname });

      // removing those key whose value does not match with database attributes.
      Object.keys(whereFilter).forEach(
        (key) =>
          Object.keys(db.tag.getAttributes()).includes(key) ||
          delete whereFilter[key as keyof typeof whereFilter]
      );
    }

    /** Selected Fields */
    const fields = Object.keys(
      graphqlFields(
        info,
        {},
        { processArguments: true, excludedFields: ['__typename'] }
      )
    );

    /**
     * Quering all tags by username, userid, tagname or tagid.
     */
    if (input?.where?.userid || input?.where?.username) {
      const Tags = await FIND_ALL_TAGS_BY_USER({
        user: {
          id: userid as string,
          username: username as string
        },
        where: whereFilter,
        attributes: fields,
        pagination: {
          offset: pagination?.offset,
          limit: pagination?.limit
        }
      });

      return Tags as unknown as [Tag];
    }

    /**
     * Quering all tags.
     */
    const TAGS = FIND_ALL_TAGS({
      where: whereFilter,
      attributes: [...fields],
      pagination: {
        offset: pagination?.offset,
        limit: pagination?.limit
      }
    });

    return TAGS as unknown as [Tag];
  },
  popularTags: async (_, { pagination }, ctx, info) => {
    /** Selected Fields */
    const fields = Object.keys(
      graphqlFields(
        info,
        {},
        { processArguments: true, excludedFields: ['__typename', 'count'] }
      )
    );

    return (await GET_ALL_POPULAR_TAGS(fields, {
      ...pagination
    })) as unknown as PopularTagsResponse[];
  }
};
