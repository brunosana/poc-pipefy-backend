import { PipefyInfraService } from '@infra/pipefy.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PipefyData } from './config/pipefy-data';
import { UpdateEnergisaFieldsDto } from './dtos/update-energisa-fields.dto';
import { generateEnergisaData } from './utils/generate-energisa-data';
import { ValidateCardUseCase } from './validate-card.usecase';

@Injectable()
export class UpdateEnergisaFieldsUseCase {
  constructor(
    private readonly pipefyService: PipefyInfraService,
    private readonly validateCard: ValidateCardUseCase,
    private readonly pipefyData: PipefyData,
  ) {}

  async execute({ data }: UpdateEnergisaFieldsDto): Promise<void> {
    if (data.action !== 'card.create') {
      throw new BadRequestException(`Wrong event (${data.action})`);
    }

    const { card: pipefyCard } = await this.pipefyService.getCard(data.card.id);

    const isValidCard = this.validateCard.execute(pipefyCard);

    if (!isValidCard) {
      throw new BadRequestException('Invalid card');
    }

    const cnpjField = pipefyCard.fields.find(
      (field) => field.field.id === 'cnpj',
    );
    if (!cnpjField) {
      throw new BadRequestException('Wrong card. Not found cnpj field');
    }

    //nesse momento fazemos a busca na API da energisa
    // suponhamos que encontramos essas informações:
    const energisaFields = generateEnergisaData();

    //mover o card
    await this.pipefyService.moveCard({
      card: data.card.id,
      target: this.pipefyData.phaseWaiting,
    });
    // alterar os campos do card
    await this.pipefyService.updateEnergisaCardFields({
      cardId: data.card.id,
      codigoCredor: energisaFields.codigoCredor,
      nomeCredor: energisaFields.nomeCredor,
      numeroContratos: energisaFields.numeroContratos,
      tipoContrato: energisaFields.tipoContrato,
    });
  }
}
