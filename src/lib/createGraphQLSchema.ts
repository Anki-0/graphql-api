import { readdirSync, writeFileSync } from 'fs';
import { getDirname } from '../utils/helpers.js';
import { __PRODUCTION__ } from '../utils/assertions.js';
import { loadCustomDerivatives } from '../graphql/directives/index.js';
import { loadCustomScalars } from '../graphql/scalars/index.js';
import path from 'path';
import { pathToFileURL } from 'url';

const EXT = __PRODUCTION__ ? 'js' : 'ts';

const __dirname = getDirname(import.meta.url);

const gqlFiles = readdirSync(path.join(__dirname, '../graphql/schemas')).filter(
  (fileName) =>
    fileName.indexOf('.') !== 0 &&
    !fileName.startsWith('__') &&
    fileName.slice(-10, -3) === `.schema` &&
    fileName.slice(-3) === `.${EXT}`
);

const { loadDirectiveTypeDefs } = loadCustomDerivatives;
const { ScalarTypeDefs } = loadCustomScalars;

let typeDefs = ``;
typeDefs += await loadDirectiveTypeDefs(typeDefs);
typeDefs += await ScalarTypeDefs(typeDefs);

for (const fileIndex in gqlFiles) {
  const __typedef: string = (
    await import(
      pathToFileURL(
        path.join(__dirname, '../graphql/schemas', gqlFiles[fileIndex])
      ).href
    )
  ).default;

  if (__typedef !== undefined) {
    typeDefs += __typedef;
  }
}

const typeDefsWithGqlTag =
  "import {gql} from 'graphql-tag'; export default gql/* GraphQL */ `\n [CODE]`".replace(
    '[CODE]',
    typeDefs
  );

try {
  writeFileSync(
    path.join(__dirname, '../graphql/schemas/__generated__', 'typeDefs.ts'),
    typeDefsWithGqlTag,
    {
      encoding: 'utf8',
      flag: 'w+'
    }
  );
} catch (error) {
  console.error('Error writting typedefs in /graphql/schemas/* -> ', error);
}
