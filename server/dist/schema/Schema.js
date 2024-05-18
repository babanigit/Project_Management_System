"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// mongoose models
const Project_1 = __importDefault(require("../models/Project"));
const Client_1 = __importDefault(require("../models/Client"));
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
                return Project_1.default.findById(parent.clientId);
                // return clients.find(client => client.id === parent.clientId);
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
                return Project_1.default.find();
                // return projects;
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Project_1.default.findById(args.id);
                // return projects.find(project => project.id === args.id);
            },
        },
        clients: {
            type: new graphql_1.GraphQLList(ClientType),
            resolve(parent, args) {
                return Client_1.default.find();
                // return clients;
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                // async() => {
                //     return await Client.findById(args.id);
                // }
                return Client_1.default.findById(args.id);
                // return clients.find(client => client.id === args.id);
            },
        },
    },
});
// Mutations
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                phone: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client_1.default({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                Project_1.default.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => {
                        project.deleteOne();
                    });
                });
                return Client_1.default.findByIdAndDelete(args.id);
            },
        },
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project_1.default({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                return Project_1.default.findByIdAndDelete(args.id);
            },
        },
        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project_1.default.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                }, { new: true });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation
});
