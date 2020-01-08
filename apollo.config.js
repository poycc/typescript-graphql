module.exports = {
  client: {
    service: {
      name: 'cat-living',
      url: 'http://localhost:4000/graphql',
    },
  },
  includes: ['./src/modals/**/schema.graphql'],
  excludes: ['**/node_modules/**'],
};
