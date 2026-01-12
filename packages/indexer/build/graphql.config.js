export default {
    projects: {
        indexer: {
            schema: "./schema.indexer.graphql",
            documents: "./src/indexer/**/*.graphql",
        },
        squid: {
            schema: "./schema.squid.graphql",
            documents: "./src/squid/**/*.graphql",
        },
    },
};
