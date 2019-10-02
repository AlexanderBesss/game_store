import { Min, IsInt, IsString, Length, IsDateString, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiModelProperty()
  @IsString()
  @Length(5, 40)
  title: string;

  @ApiModelProperty()
  @IsInt()
  @Min(0)
  price: number;

  @ApiModelProperty()
  @Allow()
  @Length(2, 20, {
    each: true,
  })
  tags: string[];

  @ApiModelProperty()
  @IsInt()
  publisherId: number;

  @ApiModelProperty({ type: String })
  @IsDateString()
  releaseDate: Date;
}
