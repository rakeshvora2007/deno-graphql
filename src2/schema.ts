import {
  buildSchema,
} from "https://cdn.pika.dev/graphql/^15.0.0";

const schema = buildSchema(`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    getTotal: String
    getExpense(id:String): Expense
    getInconme(id:String): Income
  }

  type Mutation {
    addExpense(input: ExpenseInput): Expense
    deleteExpense(id: String): Expense
    addIncome(input: IncomeInput): Income
    deleteIncome(id: String): Income
  }

  type Expense {
    id: ID
    name: String
    amount: String
    type: String
  }

  type Income {
    id: ID
    name: String
    amount: String
    type: String
  }

  input ExpenseInput {
    id: ID
    name: String
    amount: String
    type: String
  }

  input IncomeInput {
    id: ID
    name: String
    amount: String
    type: String
  }
`);

export default schema;
