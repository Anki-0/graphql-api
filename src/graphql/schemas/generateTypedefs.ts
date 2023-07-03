import { readdirSync, writeFileSync } from 'fs';
import { getDirname } from '../../utils/common.js';
import { __PRODUCTION__ } from '../../utils/assertions.js';
import { loadCustomScalars } from '../scalars/index.js';
import { loadCustomDerivatives } from '../directives/index.js';

const EXT = __PRODUCTION__ ? 'js' : 'ts';

// @ts-ignore
const __dirname = getDirname(import.meta.url);

const gqlFiles = readdirSync(__dirname).filter(
  (fileName) =>
    fileName.indexOf('.') !== 0 &&
    !fileName.includes('.generated.ts') &&
    fileName !== `generateTypedefs.${EXT}` &&
    fileName.slice(-3) === `.${EXT}`
);

const { loadDirectiveTypeDefs } = loadCustomDerivatives;
const { ScalarTypeDefs } = loadCustomScalars;

let typeDefs = ``;
typeDefs += await loadDirectiveTypeDefs(typeDefs);
typeDefs += await ScalarTypeDefs(typeDefs);

for (const fileIndex in gqlFiles) {
  const __typedef: string = (await import(`./${gqlFiles[fileIndex]}`)).default;

  if (__typedef !== undefined) {
    typeDefs += __typedef;
  }
}

const typeDefsWithGqlTag =
  "import {gql} from 'graphql-tag'; export default gql`#graphql\n[CODE]`".replace(
    '[CODE]',
    typeDefs
  );

try {
  writeFileSync(`${__dirname}\\typeDefs.generated.ts`, typeDefsWithGqlTag, {
    encoding: 'utf8',
    flag: 'w+'
  });
} catch (error) {
  console.error('Error writting typedefs in /graphql/schemas/* -> ', error);
}
