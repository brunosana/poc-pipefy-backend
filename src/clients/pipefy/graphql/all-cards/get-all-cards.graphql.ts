import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { GetAllCardsInput, GetAllCardsOutput } from './get-all-cards.dto';
import {
  getAllCardsQuery,
  GetAllCardsQueryOutput,
} from './get-all-cards.query';

@Injectable()
export class GetAllCards {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ pipeId }: GetAllCardsInput): Promise<GetAllCardsOutput> {
    const response = await this.graphqlClient.request<GetAllCardsQueryOutput>(
      getAllCardsQuery,
      {
        input: pipeId,
      },
    );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }

    return {
      cards: response.allCards.edges.map((card) => ({
        fields: card.node.fields,
        currentPhase: card.node.current_phase.name,
        id: card.node.id,
        title: card.node.title,
      })),
    };
  }
}
