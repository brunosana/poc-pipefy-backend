import { PipefyInfraService } from '@infra/pipefy.service';
import { Injectable } from '@nestjs/common';
import { PipefyData } from './config/pipefy-data';
import { ValidateAllDataDto } from './dtos/validate-all-data.dto';

@Injectable()
export class ValidateAllDataUseCase {
  constructor(
    private readonly pipefyData: PipefyData,
    private readonly pipefyService: PipefyInfraService,
  ) {}

  async execute(input: ValidateAllDataDto): Promise<void> {
    if (input.data.to.id !== this.pipefyData.phaseCheckAll) {
      return;
    }

    const { card } = await this.pipefyService.getCard(input.data.card.id);
    const fields = {
      cnpj: 'cnpj',
      numero_contratos: 'n_mero_de_contratos',
      codigo_credor: 'c_digo_credor',
      nome_credor: 'nome_credor',
      tipo_de_contrato: 'tipo_de_contrato',
    };
    function getField(fid: string) {
      return card.fields.find((f) => f.field.id === fid);
    }

    const cnpjField = getField(fields['cnpj']);
    if (cnpjField.value === '45672447000145') {
      //erro
      await this.pipefyService.moveCard({
        card: input.data.card.id,
        target: this.pipefyData.phaseError,
      });
      await this.pipefyService.updateErrorField({
        cardId: input.data.card.id,
        message: 'Ser feio demais',
      });
      return;
    }

    // suponha que seja sucesso
    await this.pipefyService.moveCard({
      card: input.data.card.id,
      target: this.pipefyData.phaseSuccess,
    });
  }
}
