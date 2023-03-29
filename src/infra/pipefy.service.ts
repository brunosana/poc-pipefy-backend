import { PipefyService } from '@clients/pipefy/pipefy.service';
import { Injectable } from '@nestjs/common';
import { CreateWebhookInfraDto } from './dtos/create-webhook.infra.dto';
import { MoveCardInfraDto } from './dtos/move-card.infra.dto';
import { UpdateEnergisaCardFieldsInfraDto } from './dtos/update-energisa-card-fields.infra.dto';
import { UpdateErrorCardFieldsInfraDto } from './dtos/update-error-card-fields.infra.dto';

@Injectable()
export class PipefyInfraService {
  constructor(private readonly pipefyService: PipefyService) {}

  async listAllWebhooks() {
    return await this.pipefyService.allWebhooks();
  }

  async createWebhook(input: CreateWebhookInfraDto) {
    return await this.pipefyService.createWebhook(input);
  }

  async deleteWebhook(id: number) {
    return await this.pipefyService.deleteWebhook(id);
  }

  async getCard(id: number) {
    return await this.pipefyService.getCard(id);
  }

  async moveCard({ card, target }: MoveCardInfraDto) {
    return await this.pipefyService.moveCard({
      cardId: card,
      phaseToMoveId: target,
    });
  }

  async updateEnergisaCardFields({
    cardId,
    codigoCredor,
    nomeCredor,
    numeroContratos,
    tipoContrato,
  }: UpdateEnergisaCardFieldsInfraDto) {
    return await this.pipefyService.updateFields({
      nodeId: cardId,
      fields: [
        {
          fieldId: 'n_mero_de_contratos',
          value: numeroContratos,
        },
        {
          fieldId: 'c_digo_credor',
          value: codigoCredor,
        },
        {
          fieldId: 'nome_credor',
          value: nomeCredor,
        },
        {
          fieldId: 'tipo_de_contrato',
          value: tipoContrato,
        },
      ],
    });
  }

  async updateErrorField({ cardId, message }: UpdateErrorCardFieldsInfraDto) {
    return await this.pipefyService.updateFields({
      nodeId: cardId,
      fields: [
        {
          fieldId: 'motivo',
          value: message,
        },
      ],
    });
  }

  async getAllCards() {
    return await this.pipefyService.allCards();
  }
}
