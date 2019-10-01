import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    let filePath: string;
    if (process.env.NODE_ENV === undefined) {
      filePath = 'development.env';
    } else {
      filePath = `${process.env.NODE_ENV}.env`;
    }
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(config: any): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(config, envVarsSchema);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get DB_HOST(): string {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT(): string {
    return this.envConfig.DB_PORT;
  }

  get DB_USERNAME(): string {
    return this.envConfig.DB_USERNAME;
  }

  get DB_PASSWORD(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_NAME(): string {
    return this.envConfig.DB_NAME;
  }
}
