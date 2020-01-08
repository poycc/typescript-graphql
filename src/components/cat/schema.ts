const { gql } = require('apollo-server-koa')

const schema = gql`

  type Food {
    id: Int
    name: String
  }

  type Cat {
    color: String
    love(foodId: Int): Food
  }

  extend type Query {
    cats: [Cat]
  }
`

module.exports = { schema }