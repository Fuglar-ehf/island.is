import { Field, ID, ObjectType } from '@nestjs/graphql'

import { ILatestNewsSlice } from '../generated/contentfulTypes'

import { News } from './news.model'

@ObjectType()
export class LatestNewsSlice {
  @Field()
  typename: string

  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [News])
  news: News[]
}

export const mapLatestNewsSlice = ({
  fields,
  sys,
}: ILatestNewsSlice): LatestNewsSlice => ({
  typename: 'LatestNewsSlice',
  id: sys.id,
  title: fields.title ?? '',
  news: [], // populated by resolver
})
