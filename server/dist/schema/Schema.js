"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SampleData_1 = require("../SampleData");
const graphql_1 = require("graphql");
// ProjectType 
const ProjectType = new graphql_1.GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // return Project.findById(parent.clientId);
                return SampleData_1.clients.find(client => client.id === parent.clientId);
            },
        },
    }),
});
// Client Type
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    }),
});
// RootQuery
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new graphql_1.GraphQLList(ProjectType),
            resolve(parent, args) {
                //   return Project.find();
                return SampleData_1.projects;
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                //   return Project.findById(args.id);
                return SampleData_1.projects.find(project => project.id === args.id);
            },
        },
        clients: {
            type: new graphql_1.GraphQLList(ClientType),
            resolve(parent, args) {
                //   return client.find(client=> client);
                return SampleData_1.clients;
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                //   return Client.findById(args.id);
                return SampleData_1.clients.find(client => client.id === args.id);
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
