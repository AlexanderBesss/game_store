import { Min, IsInt, IsString, Length, IsDateString, Allow, IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @Length(5, 40)
  @IsOptional()
  title?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @Allow()
  @Length(2, 20, {
    each: true,
  })
  @IsOptional()
  tags?: string[];

  @IsInt()
  @IsOptional()
  publisherId?: number;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
}
