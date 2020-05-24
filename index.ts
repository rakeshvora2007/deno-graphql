import {
    graphql,
} from "https://cdn.pika.dev/graphql/^15.0.0";
import {Application, Router} from "https://deno.land/x/oak/mod.ts";
// import {makeExecutableSchema} from 'https://cdn.pika.dev/graphql-tools/^6.0.0';
// import * as pkg from 'https://cdn.pika.dev/graphql-anywhere@^4.2.6';

import resolvers from "./resolvers.ts";
import schema from "./schema.ts";


const executeSchema = async (query:any) => {
    const result = await graphql(schema, query, resolvers); 
    return result;
}

var router = new Router();

router.post("/graph", async ({request, response}) => {
    if(request.hasBody) {
        const body = await request.body();
        console.log(body)
        const query = `${body.value}`;
        const result = await executeSchema(query);
        response.body = result;
        // response.body = "Query Available";
    } else {
        response.body = "Query Unavailable";
    }
})


let app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server running");
app.listen({port: 5000})