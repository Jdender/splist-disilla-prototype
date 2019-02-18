import { Resolver, Mutation, Arg, Query, Args } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './Message.ent';
import { Repository } from 'typeorm';
import { MessageSendInput, MessageHistoryArgs } from './message.in';

@Resolver()
export class MessageResolver {

    @InjectRepository(Message)
    private messageRepo: Repository<Message>;

    @Query(returns => [Message])
    messages(
        @Args() { skip, take }: MessageHistoryArgs
    ) {
        return this.messageRepo.find({
            skip,
            take,
        });
    }

    @Mutation(returns => Message)
    sendMessage(
        @Arg('data') newData: MessageSendInput,
    ) {
        const newMessage = this.messageRepo.create(newData);

        const message = this.messageRepo.save(newMessage);

        return message;
    }
}
