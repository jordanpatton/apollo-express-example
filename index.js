const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const app = express();

// =======================================================================================
// graphql
// =======================================================================================
const books = [
    { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
    { title: 'Jurassic Park', author: 'Michael Crichton' },
];

const typeDefs = gql`
# Comments in GraphQL are defined with the hash (#) symbol.
# This "Book" type can be used in other type declarations.
type Book {
    title: String
    author: String
}
# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
    books: [Book]
}
`;

const resolvers = { Query: { books: () => books } };

const apolloServer = new ApolloServer({ typeDefs, resolvers });
// apolloServer.listen().then(({ url }) => {console.log(`🚀  Server ready at ${url}`);});
apolloServer.applyMiddleware({ app });

// =======================================================================================
// express
// =======================================================================================
app.get('/', (_req, res, _next) => res.send('OK'));

app.listen(3000, () => {
    console.log(`express listening on port 3000...`);
    console.log(`graphql available at ${apolloServer.graphqlPath}...`);
});
