import { PipefyInfraService } from '@infra/index';
import { Injectable } from '@nestjs/common';
import { CreateWebhookInputDto } from './dtos/create-webhook.dto';

@Injectable()
export class CreateWebhookUseCase {
  constructor(private readonly pipefyService: PipefyInfraService) {}

  async execute(input: CreateWebhookInputDto) {
    return await this.pipefyService.createWebhook(input);
  }
}
