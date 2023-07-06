import { Op } from 'sequelize';
import { User } from '../../types/__generated__/resolvers-types.js';
import { createFieldLoader } from '../../utils/dataloader.js';
import db from '../../database/index.js';

const fieldLoadFn = async (
  ids: User['id'][],
  fields?: (keyof Omit<User, '__typename'>)[]
) => {
  const users = await db.user.findAll({
    where: {
      id: {
        [Op.in]: ids
      }
    },
    attributes: fields
  });

  const userById = users.reduce((acc, curr) => {
    acc[curr.id] = curr;

    return acc;
  }, {} as any);

  return ids.map((id) => userById[id] || null);
};

export const userByIdLoader = createFieldLoader(fieldLoadFn, 'id');
