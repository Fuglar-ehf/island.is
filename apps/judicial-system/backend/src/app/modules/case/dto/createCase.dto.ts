import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { CaseType } from '@island.is/judicial-system/types'

import { Accused } from '../models'

export class CreateCaseDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ enum: CaseType })
  readonly type: CaseType

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly description?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly policeCaseNumber: string

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: Accused, isArray: true })
  readonly accused: Accused[]

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly defenderName?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly defenderEmail?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly defenderPhoneNumber?: string

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readonly sendRequestToDefender?: boolean

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly courtId?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly leadInvestigator?: string
}
