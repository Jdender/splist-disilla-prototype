import 'reflect-metadata';
import { buildSchema, useContainer as useGraphql } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import { createConnection, useContainer as useOrm} from 'typeorm';

// Set up typedi
useGraphql(Container);
useOrm(Container);

void async function() {

    await createConnection({
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        synchronize: true,
        entities: [
            __dirname + '/**/*.ent.ts',
        ],
        cache: {
            type: 'redis',
            options: {
                url: process.env.REDIS_URL,
            },
        },
    });

    const schema = await buildSchema({
        resolvers: [
          __dirname + '/**/*.res.ts',
        ],
    });

    const server = new ApolloServer({ 
        schema,
        playground: true,
    });
    
    const { url } = await server.listen(8080);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}();
