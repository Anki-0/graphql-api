import { GraphQLError } from 'graphql';
import {
  MutationResolvers,
  Post
} from '../../../__generated__/resolvers-types.js';
import { parseJSON } from 'date-fns';
import { QueryTypes } from 'sequelize';

// Demo user
const auth = {
  isUserLogged: true,
  currentUser: {
    id: 'e7dfc7a3-5dc2-4c96-aea9-9625280ba00d',
    role: 'admin'
  }
};

type TAGS = {
  tag_name: string;
  createdAt: Date;
}[];

export const PostMutations: MutationResolvers = {
  createPost: async (_, { input }, { db }) => {
    if (!auth.isUserLogged) {
      throw new GraphQLError('User is not Authenticated!');
    }

    const CreatedPost = await db.post.create({
      title: input.title,
      'sub-title': input.subTitle as string,
      content: input.content as string,
      image: input.image as string,
      banner: input.banner as string,
      status: input.status,
      publishedBy: auth.currentUser?.id,
      createdAt: parseJSON(Date.now())
    });

    if (input.tags) {
      /**
       * Creating tags Object from given tags[]
       */
      const TAGS: TAGS = input.tags.map((tagName) => {
        return {
          tag_name: tagName as string,
          createdAt: parseJSON(Date.now())
        };
      });

      /**
       * Inserting tags into tags table,
       * if not already exits.
       */
      const createdTags = await db.tag.bulkCreate(TAGS, {
        ignoreDuplicates: true // insert only if tag is unique
      });

      /**
       * mapping post_id with tag_id
       * */
      const values = createdTags.map(({ tag_name }: { tag_name: string }) => {
        return tag_name;
      });

      /**
       * Inserting values into post_tag_juction table
       * */
      await db.sequelize?.query(
        `INSERT IGNORE
                                 INTO posts_tags_junctions (post_id, tag_id)
                                 SELECT '${CreatedPost.id}', tags.id
                                 FROM tags
                                 WHERE tags.tag_name IN (:TAGS);
                              `,
        { replacements: { TAGS: values }, type: QueryTypes.INSERT }
      );

      /**
       * Inserting values into user_tag_juction table
       * */
      await db.sequelize?.query(
        `INSERT IGNORE
                                 INTO users_tags_junctions (user_id, tag_id, createdAt)
                                 SELECT '${auth.currentUser.id}', tags.id, now()
                                 FROM tags
                                 WHERE tags.tag_name IN (:TAGS);
                                 `,
        { replacements: { TAGS: values }, type: QueryTypes.INSERT }
      );
    }

    return CreatedPost as unknown as Post;
  }
};