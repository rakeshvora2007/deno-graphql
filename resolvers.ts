import { addEntry } from "./database.ts";

const resolvers = {
  add: async (root: any, contextL: any, args: any, info: any) => {
    console.log("ARGS HERE");
    console.log(args);
    console.log(contextL);
    console.log(root);
    console.log(info);
    // return await addEntry(args.input);
  },
  notHello: () => "Bye Bye World",
};

export default resolvers;
