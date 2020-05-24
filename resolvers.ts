// import { addEntry, getUser, getDegree } from "./database.ts";

// const resolvers = {
//   add: async (root: any, context: any, args: any, info: any) => {
//     console.log("Root HERE");
//     console.log(root);
//     console.log("Context HERE");
//     console.log(context);
//     console.log("ARGS HERE");
//     console.log(args);
//     console.log("Info HERE");
//     console.log(info);
//     // return await addEntry(args.input);
//   },
//   notHello: () => "Bye Bye World",
//   getUser: async (a: any, b: any, c: any, d: any) => {
//     console.log("******************Root HERE******************");
//     console.log(a);
//     console.log("******************Context HERE******************");
//     console.log(b);
//     console.log("******************ARGS HERE******************");
//     console.log(c);
//     console.log("******************Info HERE******************");
//     console.log(d);
//     return await getUser();
//   }
// };

// export default resolvers;

export default class Query {
  async getUser(args:any, context:any) {
    return new User({
      name: "rakesh",
      email: "rjain@gmail.com",
      age: 34,
      degree: 7311
    });
  }
}

class User {
  name: any;
  email: any;
  age: any;
  _degree: any;

  constructor(row:any) {
    this.name = row.name;
    this.email = row.email;
    this.age = row.age;
    this._degree = row.degree;
  }

  async degree(_:any, context:any) {
    console.log("degree resolved and result returned");
    return {
      instituteName: "ABC",
      qualification: "NCAA"
    }
  }
}