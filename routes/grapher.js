const { makeExecutableSchema } = require("graphql-tools");
const Person = require("../models/person");

const typeDefs = `
  type Query {
    allClients(limit: Int): [Client]
    allPersons(limit: Int): [Person]
    allProjects(limit: Int): [Project]

    client(id: ID): Client
    person(id: ID): Person
    project(id: ID): Project
  }

  type Person {
    id: ID!
    name: String!
    projects: [Project]
    timeOffs: [TrackedTime]
    workTime: [TrackedTime]
  }

  type Project {
    id: ID!
    name: String!
    client: Client!
    baseBudget: String
    description: String
    persons: [Person]
    netsuiteCode: Int!
    endDate: Int
    startDate: Int
    holidays: [TrackedTime]
  }

  type Client {
    id: ID!
    name: String!
    projects: [Project]!
  }

  type TrackedTime {
    id: ID!
    type: TrackedTimeType!
    date: Int!
    hours: Int!
    note: String
    person: Person!
    project: Project!
  }

  enum TrackedTimeType {
    WORK_TIME
    HOLIDAY
    PAID_TIME_OFF
    UNPAID_TIME_OFF
  }
`;

const resolvers = {
  Query: {
    person: (root, { id }) =>
      Person.findById(+id).then(
        person =>
          person ||
          Promise.reject(new Error(`Person with id (${id}) Not Found`))
      )
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
