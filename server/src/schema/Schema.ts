
import { query } from "express";
import { clients, projects } from "../SampleData"

import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } from "graphql"


// ProjectType 
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // return Project.findById(parent.clientId);
                return clients.find(client => client.id === parent.clientId);
            },
        },
    }),
})

// Client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                //   return Project.find();
                return projects;
            },
        },

        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //   return Project.findById(args.id);
                return projects.find(project => project.id === args.id);

            },
        },

        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                //   return client.find(client=> client);
                return clients;
            },
        },

        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //   return Client.findById(args.id);
                return clients.find(client => client.id === args.id);
            },
        },
    },
});


export default new GraphQLSchema({
    query: RootQuery
})