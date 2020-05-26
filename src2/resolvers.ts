import {
  calculateBalance,
  insertExpense,
  readExpense,
  removeExpense,
  insertIncome,
  readIncome,
  removeIncome
} from "./database.ts";

export default class Query {
  async getBalanceSheet() {
    const result: any = await calculateBalance();
    return result;
  }

  async getExpense({ id }: any) {
    const result: any = await readExpense(id);
    return result;
  }

  async addExpense({ input }: any) {
    const result: any = await insertExpense(input);
    return result;
  }

  async deleteExpense({ id }: any) {
    const result: any = await removeExpense(id);
    return result;
  }

  async getIncome({ id }: any) {
    const result: any = await readIncome(id);
    return result;
  }

  async addIncome({ input }: any) {
    const result: any = await insertIncome(input);
    return result;
  }

  async deleteIncome({ id }: any) {
    const result: any = await removeIncome(id);
    return result;
  }
}
