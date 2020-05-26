import {
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "https://cdn.pika.dev/graphql/^15.0.0";


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    getBalanceSheet: {
      type: new GraphQLString,
      resolve: root => {
      }
    },
    getExpense: {
      type: ExpenseType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => {
      }
    },
  }),
});

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  description: 'Somebody that you used to know',
  fields: () => ({
    id: {type: GraphQLString},
    email: {type: GraphQLString, resolve: (root, args)=> {}},
    name: {type: GraphQLString},
    amount: {type: GraphQLString},
    type: {type: GraphQLString},
  }),
});

const Mutation = new GraphQLObjectType({
  
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default schema;
