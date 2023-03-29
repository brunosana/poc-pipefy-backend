import { UpdateEnergisaFieldsUseCase } from '@core/update-energisa-fields.usecase';
import { ValidateAllDataUseCase } from '@core/validate-all-data.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { NewCardWebhookPayload } from '../dtos/new-card.webhook.payload';
import { UpdateCardPhaseWebhookPayload } from '../dtos/update-card-phase.webhook.payload';

@Controller({
  version: '1',
  path: 'pipefy/webhooks',
})
export class PipefyWebhooksController {
  constructor(
    private readonly updateEnergisaFieldsUsecase: UpdateEnergisaFieldsUseCase,
    private readonly validateAllDataUsecase: ValidateAllDataUseCase,
  ) {}

  @Post('/newCard')
  async newCard(@Body() input: NewCardWebhookPayload) {
    await this.updateEnergisaFieldsUsecase.execute(input);
  }

  @Post('/updateCardPhase')
  async updateCardPhase(@Body() input: UpdateCardPhaseWebhookPayload) {
    await this.validateAllDataUsecase.execute(input);
  }
}
