import { Min, IsInt, IsString, Length, IsDateString, Allow, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateGameDto {
  @ApiModelProperty()
  @IsString()
  @Length(5, 40)
  @IsOptional()
  title?: string;

  @ApiModelProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiModelProperty()
  @Allow()
  @Length(2, 20, {
    each: true,
  })
  @IsOptional()
  tags?: string[];

  @ApiModelProperty()
  @IsInt()
  @IsOptional()
  publisherId?: number;

  @ApiModelProperty({ type: String })
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
}
