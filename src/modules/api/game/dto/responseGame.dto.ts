import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseGameDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  price: number;

  @ApiModelProperty()
  tags: string[];

  @ApiModelProperty({ type: String })
  releaseDate: Date;

  @ApiModelProperty()
  discount: number;
}
