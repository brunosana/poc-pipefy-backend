import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { GetCardInput, GetCardOutput } from './get-card.dto';
import { getCardQuery, GetCardQueryOutput } from './get-card.query';

@Injectable()
export class GetCard {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ id }: GetCardInput): Promise<GetCardOutput> {
    const response = await this.graphqlClient.request<GetCardQueryOutput>(
      getCardQuery,
      {
        id,
      },
    );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }

    return {
      card: {
        pipe: response.card.pipe,
        current_phase: response.card.current_phase,
        fields: response.card.fields,
        assignees: response.card.assignees,
      },
    };
  }
}
