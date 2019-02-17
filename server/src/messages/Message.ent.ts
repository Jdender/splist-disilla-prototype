import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IMessage } from 'typings';

@Entity()
@ObjectType()
export class Message implements IMessage {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    content: string;
}
