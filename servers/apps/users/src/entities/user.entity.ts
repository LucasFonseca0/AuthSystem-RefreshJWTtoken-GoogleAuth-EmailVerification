import { Directive, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()

@Directive('@key(fields:"id")')

export class Avatars{
    @Field()
    id:string
}