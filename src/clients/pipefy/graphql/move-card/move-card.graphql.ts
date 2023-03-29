import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { MoveCardInput } from './move-card.dto';
import { moveCardMutation, MoveCardMutationOutput } from './move-card.query';

@Injectable()
export class MoveCard {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ cardId, phaseToMoveId }: MoveCardInput): Promise<void> {
    const response = await this.graphqlClient.request<MoveCardMutationOutput>(
      moveCardMutation,
      {
        input: {
          card_id: cardId,
          destination_phase_id: phaseToMoveId,
        },
      },
    );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }
  }
}
