import DataLoader from 'dataloader';
import groupBy from 'lodash.groupby';

/**
 * -----------------
 * createFieldLoader
 * -----------------
 */
type KeyType = string | number;

type KeyAndFields<K, F> = { key: K; fields?: F[] };

function createFullHash(k: string, fieldHash: string) {
  return `${k}:${fieldHash}`;
}
function addHashes<K, F>(keyAndFields: KeyAndFields<K, F>) {
  const fieldSet = new Set(keyAndFields.fields);
  const fieldHash = 'f:' + Array.from(fieldSet).sort().join(':');
  const fullHash = createFullHash(`${keyAndFields.key}`, fieldHash);
  return { ...keyAndFields, fieldHash, fullHash };
}

/**
 * A Dataloader that will batch the loading of data for same set of fields.
 * Requires sortIdKey to be passed to help it find the values to be sorted against
 */
export const createFieldLoader = <V, F extends keyof V, K extends KeyType = string>(
  batchLoadFn: (keys: K[], fields?: F[]) => Promise<V[]>,
  sortIdKey: keyof V
) => {
  type LoadFnKey = { key: K; fields?: F[] };

  return new DataLoader(
    async (loadKeys: readonly LoadFnKey[]) => {
      const loadKeysWithHash = loadKeys.map((k) => addHashes(k));
      const store = new Map<string, V>();

      //1. Form batches to load at once based on fieldHash. all ids with same field hash should be loaded at the same time.
      const fieldHashGroups = groupBy(loadKeysWithHash, 'fieldHash');
      await Promise.all(
        Object.entries(fieldHashGroups).map(async ([fieldHash, keysToLoad]) => {
          //2. In each batch, load values based on the id and fields. Make sure the id field is present here.
          const ids = keysToLoad.map((k) => k.key);
          let fields = keysToLoad[0]?.fields;
          if (fields?.length) {
            fields = Array.from(new Set([...fields, sortIdKey as F])); // Make sure we add the id field here
          }
          const values = await batchLoadFn(ids, fields);
          //3. Create fullHash again for each returned value and store it in the store.
          values.forEach((v) => {
            const fullHash = createFullHash(`${v[sortIdKey]}`, fieldHash);
            store.set(fullHash, v);
          });
        })
      );
      //4. Get values based on the fullHash in the same order as it was requested.
      return loadKeysWithHash.map((lk) => store.get(lk.fullHash));
    },
    { cacheKeyFn: (kf) => addHashes(kf).fullHash }
  );
};
