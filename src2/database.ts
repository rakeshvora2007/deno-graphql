import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://deno.land/x/dexecutor/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// class Database {
//   constructor() {
    
//   }
  
//   __init = async() => {
//     const client = "sqlite3";
//     let dex = new Dex({
//       client: client
//     });
  
//     // Creating the query executor
//     let dexecutor = new Dexecutor({
//       client: client,
//       connection: {
//         filename: "database.db"
//       }
//     });
//     // Opening the connection
//     console.log("connecting to the db");
//     await dexecutor.connect();
//     return dex;
//   };

// }


export const insertExpense = async ({
  type,
  name,
  amount
}: {
  type: string;
  name: string;
  amount: number;
}) => {

  console.log(type, name, amount);
  const client = "sqlite3";
    let dex = new Dex({
      client: client
    });
  
    // Creating the query executor
    let dexecutor = new Dexecutor({
      client: client,
      connection: {
        filename: "database.db"
      },
      useNullAsDefault: true
    });

    // Opening the connection
    console.log("connecting to the db");
    await dexecutor.connect();

  let sqlQuery;

  // If can't insert Create the Table

  console.log("creating the table");
  const myUUID = v4.generate();
  console.log(myUUID);
  console.log(typeof myUUID)
  try {
    // CREATE TABLE Query
    sqlQuery = dex.schema
      .createTable("expense", (table: any) => {
        table.string("id");
        table.string("type");
        table.string("name");
        table.string("amount");
      })
      .toString();
    await dexecutor.execute(sqlQuery);
  } catch (e) {
    console.log(e.message);
  }

  console.log("Inserting to the query");

  // INSERT Query
  sqlQuery = dex
    .queryBuilder()
    .insert([{id: myUUID, type, name, amount }])
    .into("expense")
    .select("*")
    .toString();

    console.log(sqlQuery)

  let check = await dexecutor.execute(sqlQuery);
  console.log(check);
  console.log("SELECT OPERATION goes here");

  // SELECT Query
  let result = await dexecutor.execute(
    dex
      .select("*")
      .from("expense")
      .where({id: myUUID})
      .toString()
  );

  result = readableJSON(result);


  // DROP TABLE Query
  // sqlQuery = dex.schema.dropTable("people").toString();

  // await dexecutor.execute(sqlQuery);

  // Closing the connection
  console.log("closing connection")
  await dexecutor.close();
  return result;
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
