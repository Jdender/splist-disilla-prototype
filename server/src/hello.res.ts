import { Resolver, Query } from 'type-graphql';
import { Message } from './messages/Message.ent';

@Resolver()
class Hello {

    @Query(returns => Message)
    hello(): Message {
        return {
            id: 1,
            content: 'wew',
        };
    }
}
