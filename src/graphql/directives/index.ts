import fs from 'fs';
import { getDirname } from '../../utils/helpers.js';
import path from 'path';
import { GraphQLSchema } from 'graphql';
import { __PRODUCTION__ } from '../../utils/assertions.js';

const EXT = __PRODUCTION__ ? 'js' : 'ts';

// @ts-ignore
const _dirname = getDirname(import.meta.url);
const customDirectives = fs.readdirSync(_dirname);
const FilePathMap: Map<string, string> = new Map();

const CreateFilePathMap = (graphqlScalarsFiles: string[], __path: string) => {
  graphqlScalarsFiles.forEach((file) => {
    const filePath = `${__path}\\${file}`;

    if (fs.statSync(filePath).isFile()) {
      if (
        file.indexOf('.') !== 0 &&
        file !== `index.${EXT}` &&
        file !== `types.${EXT}` &&
        file.slice(file.indexOf('-'), -3) === '-directive' &&
        file.slice(-3) === `.${EXT}`
      ) {
        FilePathMap.set(file, path.relative(_dirname, filePath).replaceAll('\\', '/'));
      }
    }

    if (fs.statSync(filePath).isDirectory()) {
      const GraphqlScalarsFiles = fs.readdirSync(filePath);

      CreateFilePathMap(GraphqlScalarsFiles, filePath);
    }
  });
};
CreateFilePathMap(customDirectives, _dirname);

export const loadCustomDerivatives = {
  loadDirectiveTypeDefs: async (typeDefs: string) => {
    for (const [key, value] of FilePathMap.entries()) {
      const derivative = (await import(`./${value}`)).default;
      const { directiveTypeDef } = derivative();

      typeDefs += directiveTypeDef;
    }
    return typeDefs;
  },

  loadDirectiveTransformers: async (schema: GraphQLSchema) => {
    for (const [key, value] of FilePathMap.entries()) {
      const derivative = (await import(`./${value}`)).default;

      const { directiveTransformer } = derivative();

      schema = directiveTransformer(schema);
    }
    return schema;
  }
};
