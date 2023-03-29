import { PipefyInfraService } from '@infra/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllWebhooksUseCase {
  constructor(private readonly pipefyService: PipefyInfraService) {}

  async execute() {
    return await this.pipefyService.listAllWebhooks();
  }
}
