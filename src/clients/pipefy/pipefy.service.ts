import { Injectable } from '@nestjs/common';
import { CreateWebhookInputDto } from './dtos/create-webhook.dto';
import { MoveCardInputDto } from './dtos/move-card.dto';
import { PipefyConfig } from './dtos/pipefy-config.dto';
import { UpdateFieldsInputDto } from './dtos/update-fields.dto';
import { GetAllCards } from './graphql/all-cards/get-all-cards.graphql';
import { AllWebhooks } from './graphql/all-webhooks/all-webhooks.graphql';
import { CreateWebhook } from './graphql/create-webhook/create-webhook.graphql';
import { DeleteWebhook } from './graphql/delete-webhook/delete-webhook.graphql';
import { GetCard } from './graphql/get-card/get-card.graphql';
import { MoveCard } from './graphql/move-card/move-card.graphql';
import { UpdateFields } from './graphql/update-fields/update-fields.graphql';

@Injectable()
export class PipefyService {
  constructor(
    private readonly pipefyConfig: PipefyConfig,
    private readonly allWebhooksRequest: AllWebhooks,
    private readonly createWebhookRequest: CreateWebhook,
    private readonly deleteWebhookRequest: DeleteWebhook,
    private readonly getCardRequest: GetCard,
    private readonly moveCardRequest: MoveCard,
    private readonly updateFieldsRequest: UpdateFields,
    private readonly getAllCardsRequest: GetAllCards,
  ) {}

  async allWebhooks() {
    return await this.allWebhooksRequest.execute({
      pipeId: this.pipefyConfig.pipeId,
    });
  }

  async createWebhook({ actions, name, url }: CreateWebhookInputDto) {
    return await this.createWebhookRequest.execute({
      actions,
      name,
      pipe_id: this.pipefyConfig.pipeId,
      url,
    });
  }

  async deleteWebhook(id: number) {
    return await this.deleteWebhookRequest.execute({
      id,
    });
  }

  async getCard(id: number) {
    return await this.getCardRequest.execute({
      id,
    });
  }

  async moveCard({ cardId, phaseToMoveId }: MoveCardInputDto) {
    return await this.moveCardRequest.execute({
      cardId,
      phaseToMoveId,
    });
  }

  async updateFields({ fields, nodeId }: UpdateFieldsInputDto) {
    return await this.updateFieldsRequest.execute({
      fields,
      nodeId,
    });
  }

  async allCards() {
    return await this.getAllCardsRequest.execute({
      pipeId: this.pipefyConfig.pipeId,
    });
  }
}
