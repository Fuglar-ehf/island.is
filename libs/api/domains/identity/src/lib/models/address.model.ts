import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('IdentityAddress')
export class Address {
  @Field(() => String, { nullable: true })
  streetAddress?: string

  @Field(() => String)
  city!: string

  @Field(() => String, { nullable: true })
  postalCode?: string
}
