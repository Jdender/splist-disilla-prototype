import { Resolver, Mutation, Arg, Query, Args, Subscription, Root, PubSub, Publisher } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './Message.ent';
import { Repository } from 'typeorm';
import { MessageSendInput, MessageHistoryArgs } from './message.in';
import { Topics } from '../enums';

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
    async sendMessage(
        @Arg('data') data: MessageSendInput,
        @PubSub(Topics.MESSAGE_SENT) publish: Publisher<Message>
    ) {
        const message = await this.messageRepo.save(this.messageRepo.create(data));

        await publish(message);

        return message;
    }

    @Subscription({
        topics: Topics.MESSAGE_SENT,
    })
    messageSent(
        @Root() message: Message,
    ): Message {
        return message;
    }
}
