import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLEnumType } from "graphql"

// mongoose models
import Project from "../models/Project";
import Client from "../models/Client";

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
                return Project.findById(parent.clientId);
                // return clients.find(client => client.id === parent.clientId);
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
                return Project.find();
                // return projects;
            },
        },

        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
                // return projects.find(project => project.id === args.id);

            },
        },

        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
                // return clients;
            },
        },

        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // async() => {
                //     return await Client.findById(args.id);
                // }
                return Client.findById(args.id);
                // return clients.find(client => client.id === args.id);
            },
        },
    },
});


// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
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
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => {
                        project.deleteOne();
                    });
                });
                return Client.findByIdAndDelete(args.id);
            },
        },

        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
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
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            },
        },

        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
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
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
    },
});


export default new GraphQLSchema({
    query: RootQuery,
    mutation
})