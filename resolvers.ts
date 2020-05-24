import { addEntry } from "./database.ts";

const resolvers = {
  add: async (root: any, contextL: any, args: any, info: any) => {
    return await addEntry(args);
  },
  notHello: () => "Bye Bye World",
};

export default resolvers;
