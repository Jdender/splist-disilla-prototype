import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

// Set up typedi
useContainer(Container);

void async function() {

    await createConnection({
        type: 'sqlite',
        database: __dirname + '/../.data/db.sqlite',
        synchronize: true,
        entities: [
            __dirname + '/**/*.ent.ts',
        ],
    });

    const schema = await buildSchema({
        resolvers: [
          __dirname + '/**/*.res.ts',
        ],
        container: Container,
    });

    const server = new ApolloServer({ 
        schema,
        playground: true,
    });
    
    const { url } = await server.listen(8080);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}();
