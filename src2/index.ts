import {
  graphql,
} from "https://cdn.pika.dev/graphql/^15.0.0";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const networkRectifier = new AbortController();
const {signal} = networkRectifier;

import Query from "./resolvers.ts";
import schema from "./schema.ts";

const executeSchema = async ({query}: any) => {
  try {
    const result = await graphql(schema, query, new Query());
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const router = new Router();

router.post("/graph", async ({ request, response }) => {
  if (request.hasBody) {
    const body = await request.body();
    const result = await executeSchema(body.value);
    response.body = result;
  } else {
    response.body = "Query Unavailable";
  }
});

let app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server Running at PORT 5000");
app.listen({ port: 5000, signal });
