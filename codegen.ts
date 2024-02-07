import { CodegenConfig } from "@graphql-codegen/cli";


const config: CodegenConfig = {
  schema:"https://verbiflow.com/graphql",
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;