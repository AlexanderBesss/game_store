import { Min, IsInt, IsString, Length, IsDateString, Allow } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @Length(5, 40)
  title: string;

  @IsInt()
  @Min(0)
  price: number;

  @Allow()
  @Length(2, 20, {
    each: true,
  })
  tags: string[];

  @IsInt()
  publisherId: number;

  @IsDateString()
  releaseDate: Date;
}
