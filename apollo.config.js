module.exports = {
  client: {
    service: 'cat-living',
    url: 'http://localhost:4000/graphql',
  },
  includes: ['./src/components/**/schema.ts'],
  excludes: ['**/node_modules/**'],
};
