import { Resolver, Query } from 'type-graphql';

@Resolver()
class Hello {

    @Query(returns => String)
    hello() {
        return 'Hello, world!';
    }
}
