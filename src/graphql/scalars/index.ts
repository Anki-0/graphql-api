import fs from 'fs';
import path from 'path';
import { getDirname } from '../../utils/common.js';
import { __PRODUCTION__ } from '../../utils/assertions.js';

const isUppercase = (value: string) => value === value.toUpperCase();
const EXT = __PRODUCTION__ ? 'js' : 'ts';

// @ts-ignore
const __dirname = getDirname(import.meta.url);

const graphqlScalarsFiles = fs.readdirSync(__dirname);
const FilePathMap: Map<string, string> = new Map();

const CreateFilePathMap = (graphqlScalarsFiles: string[], __path: string) => {
  graphqlScalarsFiles.forEach((file) => {
    const filePath = `${__path}\\${file}`;

    // cheking is current path is a file and not a folder.
    if (fs.statSync(filePath).isFile()) {
      // checking is file file does not start with . e.g. `.fileName`
      // making sure that index.ts and type.ts file
      // make sure to add new Directive with capital letter and rest can be all lowercase
      // last each file must end with `.ts`
      if (
        file.indexOf('.') !== 0 &&
        file !== `index.${EXT}` &&
        file !== `types.${EXT}` &&
        isUppercase(file.slice(0, 1)) &&
        file.slice(-3) === `.${EXT}`
      ) {
        FilePathMap.set(
          file,
          path.relative(__dirname, filePath).replaceAll('\\', '/')
        );
      }
    }

    if (fs.statSync(filePath).isDirectory()) {
      const GraphqlScalarsFiles = fs.readdirSync(filePath);
      CreateFilePathMap(GraphqlScalarsFiles, filePath);
    }
  });
};

CreateFilePathMap(graphqlScalarsFiles, __dirname);

export const loadCustomScalars = {
  ScalarTypeDefs: async (typeDefs: string) => {
    for (const [_, value] of FilePathMap.entries()) {
      const scalar = (await import(`./${value}`)).default;
      const { scalarTypeDef } = scalar();

      typeDefs += scalarTypeDef;
    }

    return typeDefs;
  },
  GraphqlScalarTypes: async () => {
    const CustomGraphqlScalarTypes: Record<string, any> = {};

    for (const [key, value] of FilePathMap.entries()) {
      const scalar = (await import(`./${value}`)).default;
      const { graphqlScalarType, id } = scalar();
      CustomGraphqlScalarTypes[id] = graphqlScalarType;
    }

    return CustomGraphqlScalarTypes;
  }
};
