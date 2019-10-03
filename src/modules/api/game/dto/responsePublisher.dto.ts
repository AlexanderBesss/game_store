import { ApiModelProperty } from '@nestjs/swagger';

export class ResponsePublisherDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  siret: number;

  @ApiModelProperty()
  phone: string;
}
