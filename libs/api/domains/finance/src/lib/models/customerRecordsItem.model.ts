import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CustomerRecordsItem {
  @Field()
  createDate!: string

  @Field()
  createTime!: string

  @Field()
  valueDate!: string

  @Field()
  performingOrganization!: string

  @Field()
  collectingOrganization!: string

  @Field()
  chargeType!: string

  @Field()
  itemCode!: string

  @Field()
  chargeItemSubject!: string

  @Field()
  periodType!: string

  @Field()
  period!: string

  @Field()
  amount!: number

  @Field()
  category!: string

  @Field()
  subCategory!: string

  @Field()
  actionCategory!: string

  @Field()
  reference!: string

  @Field()
  referenceToLevy!: string

  @Field()
  accountReference!: string
}
