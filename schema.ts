import {
  graphql,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema,
} from "https://cdn.pika.dev/graphql/^15.0.0";

const schema = buildSchema(`
  type Query {
    notHello: String
  }

  type Mutation {
    add(input:EntryInput!): Entry
  }

  type Entry{
    entryType: String
    description: String
    dateTime: String
    amount: Int
  }

  input EntryInput{
    entryType: String
    description: String
    dateTime: String
    amount: Int
  }
  
`);

export default schema;
