const BookStatus = {
  DELETED: 0,
  NORMAL: 1,
};

const resolvers = {
  BookStatus,

  Query: {
    book: (parent: any, args: any, context: any, info: any) => ({
      name: '地球往事',
      price: 66.3,
      status: BookStatus.NORMAL,
      created: 1199116800000,
    }),
  },
};

module.exports = resolvers;
