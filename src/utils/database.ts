import { ArbitraryObject, traverse } from 'object-traversal';
import { Op } from 'sequelize';

const OperatorsMap: Map<string, keyof typeof Op> = new Map([
  ['_or', 'or'],
  ['_and', 'and'],
  ['_not', 'not'],
  ['_eq', 'eq'],
  ['_neq', 'ne'],
  ['_is', 'is'],
  ['_any', 'any'],
  ['_gt', 'gt'],
  ['_gte', 'gte'],
  ['_lt', 'lt'],
  ['_lte', 'lte'],
  ['_between', 'between'],
  ['_nbetween', 'notBetween'],

  ['_in', 'in'],
  ['_nin', 'notIn'],

  ['_like', 'like'],
  ['_nlike', 'notLike'],
  ['_ilike', 'iLike'],
  ['_nilike', 'notILike'],
  ['_regex', 'regexp'],
  ['_nregex', 'notRegexp'],
  ['_iregex', 'iRegexp'],
  ['_niregex', 'notIRegexp']
]);

export const ResolveWhereFilter = <
  T extends ArbitraryObject | undefined | null
>(
  obj: T
): {} => {
  if (obj === null) throw Error('Filter Object can not null');
  if (typeof obj === 'undefined')
    throw Error('Filter Object can not undefined');

  traverse(obj, ({ parent, key, value, meta }) => {
    if (OperatorsMap.has(key as string)) {
      if (parent) {
        if (key) {
          parent[Op[OperatorsMap.get(key) as keyof typeof Op] as any] = value;
          delete parent[key];
        }
      }
    }
  });

  return obj;
};
