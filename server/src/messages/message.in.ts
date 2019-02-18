import { InputType, Field, ArgsType, Int } from 'type-graphql';
import { IMessage } from 'typings';
import { Min, Max, Length } from 'class-validator';

@InputType()
export class MessageSendInput implements Partial<IMessage> {

    @Field()
    @Length(1, 100)
    content: string;
}

@ArgsType()
export class MessageHistoryArgs {

    @Field(type => Int)
    @Min(0) @Max(100)
    skip: number;

    @Field(type => Int)
    @Min(1) @Max(100)
    take: number;
}
