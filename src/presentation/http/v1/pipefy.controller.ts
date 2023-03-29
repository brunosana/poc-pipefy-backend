import { CreateWebhookUseCase } from '@core/create-webhook.usecase';
import { DeleteWebhookUseCase } from '@core/delete-webhook.usecase';
import { ListAllWebhooksUseCase } from '@core/list-all-webhooks.usecase';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateWebhookPayload } from '../dtos/create-webhook.payload';

@Controller({
  version: '1',
  path: 'pipefy',
})
export class PipefyController {
  constructor(
    private readonly allWebhooksUsecase: ListAllWebhooksUseCase,
    private readonly createWebhookUsecase: CreateWebhookUseCase,
    private readonly deleteWebhookUsecase: DeleteWebhookUseCase,
  ) {}

  @Get('allWebhooks')
  async allWebhooks() {
    return await this.allWebhooksUsecase.execute();
  }

  @Post('createWebhook')
  async createWebhook(@Body() input: CreateWebhookPayload) {
    return await this.createWebhookUsecase.execute(input);
  }

  @Delete('deletewebhook/:id')
  async deleteWebhook(@Param('id') id: number) {
    return await this.deleteWebhookUsecase.execute({
      id,
    });
  }
}
