import type { CodegenConfig } from "@graphql-codegen/cli";

const graphqlEndpoint = `${process.env!.NEXT_PUBLIC_API_URL}/graphql`;

const config: CodegenConfig = {
  overwrite: true,
  schema: graphqlEndpoint,
  documents: "src/gql/schemas/*.graphql",
  generates: {
    "src/gql/generated/graphql.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          DateTime: "Date",
          Date: "Date",
        },
      },
    },
    "src/gql/generated/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "./graphql.ts",
        folder: "../generated",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        scalars: {
          DateTime: "Date",
          Date: "Date",
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ["npx prettier --write"] },
};

export default config;
