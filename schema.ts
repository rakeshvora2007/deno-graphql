import {
    graphql,
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    buildSchema
} from "https://cdn.pika.dev/graphql/^15.0.0";

const schema = buildSchema(`
  type Query {
    hello: String
    notHello: String
  }
`);




/* var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return "world";
                },
            },
        },
    }),
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
      allPeople: {
        type: new GraphQLList(PersonType),
        resolve: root => {// Fetch the index of people from the REST API, 
        }
      },
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args) => {// Fetch the person with ID `args.id`,
        }
      },
    }),
  });

  const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'Somebody that you used to know',
    fields: () => ({
      firstName: {
        type: GraphQLString,
        resolve: person => person.first_name,
      },
      lastName: {
        type: GraphQLString,
        resolve: person => person.last_name,
      },
      email: {type: GraphQLString},
      id: {type: GraphQLString},
      username: {type: GraphQLString},
      friends: {
        type: new GraphQLList(PersonType),
        resolve: person => {// Fetch the friends with the URLs `person.friends`,
        }
      },
    }),
  }); */

export default schema;