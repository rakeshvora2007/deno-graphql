import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://deno.land/x/dexecutor/mod.ts";

const client = "sqlite3";

export const addEntry = async ({ entryType, description, amount }: {
  entryType: string;
  description: string;
  amount: number;
}) => {
  console.log("In Add ENTRY, database db");
  console.log(entryType);

  let dex = new Dex({
    client: client,
  });

  // Creating the query executor
  let dexecutor = new Dexecutor({
    client: client,
    connection: {
      filename: "database.db",
    },
  });

  // Opening the connection
  console.log("connecting to the db");
  await dexecutor.connect();

  let sqlQuery;

  // If can't insert Create the Table

  console.log("creating the table");

  try {
    // CREATE TABLE Query
    sqlQuery = dex.schema.createTable("budget", (table: any) => {
      table.string("entryType");
      table.string("description");
      table.string("amount");
    }).toString();
    await dexecutor.execute(sqlQuery);
  } catch (e) {
    console.log(e.message);
  }

  console.log("Inserting to the query");

  // INSERT Query
  sqlQuery = dex.queryBuilder()
    .insert([
      { entryType, description, amount },
    ])
    .into("budget")
    .toString();

  await dexecutor.execute(sqlQuery);

  console.log("SELECT OPERATION goes here");

  // SELECT Query
  let result = await dexecutor.execute(
    dex.queryBuilder()
      .select("*")
      .from("budget")
      .toString(),
  );

  result = readableJSON(result);

  console.log(result);

  // DROP TABLE Query
  // sqlQuery = dex.schema.dropTable("people").toString();

  // await dexecutor.execute(sqlQuery);

  // Closing the connection
  await dexecutor.close();
};

const readableJSON = (rawData: any) => {
  let newArray = [];
  for (let i = 0; i < rawData.length; i++) {
    newArray.push({
      entryType: rawData[i][0],
      description: rawData[i][1],
      amount: rawData[i][2],
    });
  }
  return newArray;
};
