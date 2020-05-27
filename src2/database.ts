import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://deno.land/x/dexecutor/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const client = "sqlite3";
let dex = new Dex({
  client: client
});
let dexecutor = new Dexecutor({
  client: client,
  connection: {
    filename: "database.db"
  },
  useNullAsDefault: true
});
await dexecutor.connect();

export const calculateBalance = async () => {
  let check_if_expense_table_exist = dex
    .select("name")
    .from("sqlite_master")
    .where({ type: "table", name: "expense" })
    .toString();
  let expenseTableExist = await dexecutor.execute(check_if_expense_table_exist);

  let check_if_income_table_exist = dex
    .select("name")
    .from("sqlite_master")
    .where({ type: "table", name: "income" })
    .toString();
  let incomeTableExist = await dexecutor.execute(check_if_income_table_exist);

  if(expenseTableExist && incomeTableExist) {
    try {
      let [[expenseTotal]] = await dexecutor.execute(`SELECT sum(amount) FROM expense`);
      let [[incomeTotal]] = await dexecutor.execute(`SELECT sum(amount) FROM income`);
      return (incomeTotal + expenseTotal).toFixed(2);
    } catch (error) {
      return new Error(error.message);
    }
  }
}

export const insertExpense = async ({
  type,
  name,
  amount
}: {
  type: string;
  name: string;
  amount: number;
}) => {
  const myUUID = v4.generate();

  let check_if_table_exist = dex
    .select("name")
    .from("sqlite_master")
    .where({ type: "table", name: "expense" })
    .toString();
  let exist = await dexecutor.execute(check_if_table_exist);

  if (!exist.length) {
    try {
      const sqlQuery = dex.schema
        .createTable("expense", (table: any) => {
          table.string("id");
          table.string("type");
          table.string("name");
          table.float("amount");
        })
        .toString();
      await dexecutor.execute(sqlQuery);
    } catch (error) {
      return new Error(error.message);
    }
  }

  try {
    const insertExpenseQuery = dex
      .queryBuilder()
      .insert([{ id: myUUID, type, name, amount }])
      .into("expense")
      .select("*")
      .toString();

    await dexecutor.execute(insertExpenseQuery);
    let result = await dexecutor.execute(
      dex
        .select()
        .from("expense")
        .where({ id: myUUID })
        .toString()
    );
    result = readableJSON(result)[0];
    return result;
  } catch (error) {
    return new Error(error.message);
  }
};

export const removeExpense = async (id: string) => {
  let deleteRecord = await dexecutor.execute(
    dex
      .select("*")
      .from("expense")
      .where({ id })
      .toString()
  );

  if (deleteRecord.length) {
    try {
      await dexecutor.execute(
        dex
          .delete("*")
          .from("expense")
          .where({ id })
          .toString()
      );
      return readableJSON(deleteRecord)[0];
    } catch (error) {
      return new Error(error.message);
    }
  } else {
    return new Error("Record with given ID doesn't exist");
  }
};

export const readExpense = async (id: string) => {
  try {
    let foundRecord = await dexecutor.execute(
      dex
        .select("*")
        .from("expense")
        .where({ id })
        .toString()
    );
    if (foundRecord.length) {
      return readableJSON(foundRecord)[0];
    } else {
      return new Error("Record with given ID doesn't exist");
    }
  } catch (error) {
    return new Error(error.message);
  }
};

export const insertIncome = async ({
  type,
  name,
  amount
}: {
  type: string;
  name: string;
  amount: number;
}) => {
  const myUUID = v4.generate();

  let check_if_table_exist = dex
    .select("name")
    .from("sqlite_master")
    .where({ type: "table", name: "income" })
    .toString();
  let exist = await dexecutor.execute(check_if_table_exist);

  if (!exist.length) {
    try {
      let createIncomeTableQuery = dex.schema
        .createTable("income", (table: any) => {
          table.string("id");
          table.string("type");
          table.string("name");
          table.float("amount");
        })
        .toString();
      await dexecutor.execute(createIncomeTableQuery);
    } catch (error) {
      return new Error(error.message);
    }
  }

  try {
    const insertIncomeQuery = dex
      .queryBuilder()
      .insert([{ id: myUUID, type, name, amount }])
      .into("income")
      .select("*")
      .toString();

    await dexecutor.execute(insertIncomeQuery);
    let result = await dexecutor.execute(
      dex
        .select()
        .from("income")
        .where({ id: myUUID })
        .toString()
    );
    result = readableJSON(result)[0];
    return result;
  } catch (error) {
    return new Error(error.message);
  }
};

export const removeIncome = async (id: string) => {
  let deleteRecord = await dexecutor.execute(
    dex
      .select("*")
      .from("income")
      .where({ id })
      .toString()
  );

  if (deleteRecord.length) {
    try {
      await dexecutor.execute(
        dex
          .delete("*")
          .from("income")
          .where({ id })
          .toString()
      );
      return readableJSON(deleteRecord)[0];
    } catch (error) {
      return new Error(error.message);
    }
  } else {
    return new Error("Record with given ID doesn't exist");
  }
};

export const readIncome = async (id: string) => {
  try {
    let foundRecord = await dexecutor.execute(
      dex
        .select("*")
        .from("income")
        .where({ id })
        .toString()
    );
    if (foundRecord.length) {
      return readableJSON(foundRecord)[0];
    } else {
      return new Error("Record with given ID doesn't exist");
    }
  } catch (error) {
    return new Error(error.message);
  }
};

export const readAllExpenses = async () => {
  try {
    let foundRecord = await dexecutor.execute(
      dex
        .select("*")
        .from("expense")
        .toString()
    );
    if (foundRecord.length) {
      return readableJSON(foundRecord);
    } else {
      return new Error("Record with given ID doesn't exist");
    }
  } catch (error) {
    return new Error(error.message);
  }
};

export const readAllIncomes = async () => {
  try {
    let foundRecord = await dexecutor.execute(
      dex
        .select("*")
        .from("income")
        .toString()
    );
    if (foundRecord.length) {
      return readableJSON(foundRecord);
    } else {
      return new Error("Record with given ID doesn't exist");
    }
  } catch (error) {
    return new Error(error.message);
  }
};


const readableJSON = (rawData: any) => {
  let newArray = [];
  for (let i = 0; i < rawData.length; i++) {
    newArray.push({
      id: rawData[i][0],
      type: rawData[i][1],
      name: rawData[i][2],
      amount: rawData[i][3]
    });
  }
  return newArray;
};
