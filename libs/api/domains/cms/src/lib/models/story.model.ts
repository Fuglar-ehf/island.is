import { Field, ObjectType } from '@nestjs/graphql'
import { IStory } from '../generated/contentfulTypes'
import { Image, mapImage } from './image.model'
import { Link, mapLink } from './link.model'

@ObjectType()
export class Story {
  @Field()
  label: string

  @Field()
  title: string

  @Field(() => Image)
  logo: Image

  @Field()
  readMoreText: string

  @Field()
  date: string

  @Field()
  intro: string

  @Field({ nullable: true })
  body?: string

  @Field(() => Link, { nullable: true })
  storyLink?: Link
}

export const mapStory = ({ fields, sys }: IStory): Story => ({
  label: fields.label ?? '',
  title: fields.title ?? '',
  logo: mapImage(fields.logo),
  date: sys.createdAt,
  readMoreText: fields.readMoreText,
  intro: fields.intro,
  body: fields.body && JSON.stringify(fields.body),
  storyLink: fields.storyLink ? mapLink(fields.storyLink) : null,
})
