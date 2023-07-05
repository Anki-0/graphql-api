import {
  InputMaybe,
  PaginationInput
} from '../__generated__/resolvers-types.js';
import db from '../database/index.js';

interface FindPostWithTagsProp {
  whereFilter: {};
  sortFilter: (string | null | undefined)[][];
  attributes: string[];
  pagination: InputMaybe<PaginationInput> | undefined;
}

export const FIND_POSTS = async (props: FindPostWithTagsProp) => {
  const { whereFilter, sortFilter, attributes, pagination } = props;

  return await db.post.findAll({
    where: { ...whereFilter },
    order: (sortFilter as any) ?? undefined,
    attributes: attributes,
    offset: pagination?.offset ?? undefined,
    limit: pagination?.limit ?? undefined
  });
};

export const FIND_POSTS_WITH_TAGS = async (props: FindPostWithTagsProp) => {
  const { whereFilter, sortFilter, attributes, pagination } = props;

  return await db.post.findAll({
    where: { ...whereFilter },
    attributes: attributes,
    order: (sortFilter as any) ?? undefined,
    offset: pagination?.offset ?? undefined,
    limit: pagination?.limit ?? undefined,
    include: [
      {
        model: db.tag,
        through: { attributes: [] }
        // required: false
      }
    ]
  });
};

export const DELTE_POST_WITH_ID = async (postId: string, userId: string) => {
  return await db.post.destroy({
    where: { id: postId, publishedBy: userId }
  });
};
