import { PipefyInfraService } from '@infra/index';
import { Injectable } from '@nestjs/common';
import { DeleteWebhookInputDto } from './dtos/delete-webhook.dto';

@Injectable()
export class DeleteWebhookUseCase {
  constructor(private readonly pipefyService: PipefyInfraService) {}

  async execute({ id }: DeleteWebhookInputDto) {
    return await this.pipefyService.deleteWebhook(id);
  }
}
