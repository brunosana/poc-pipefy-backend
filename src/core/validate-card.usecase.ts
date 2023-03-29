import { BadRequestException, Injectable } from '@nestjs/common';
import { PipefyData } from './config/pipefy-data';
import { CardEntity } from './shared/card.entity';

@Injectable()
export class ValidateCardUseCase {
  constructor(private readonly pipefyData: PipefyData) {}

  execute(input: CardEntity): boolean {
    if (input.pipe.id !== String(this.pipefyData.pipeId)) {
      throw new BadRequestException(
        `Wrong pipe (${input.pipe.id}:${input.pipe.name})`,
      );
    }
    return true;
  }
}
