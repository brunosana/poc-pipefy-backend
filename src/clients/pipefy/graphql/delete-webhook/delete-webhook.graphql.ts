import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { DeleteWebhookInput } from './delete-webhook.dto';
import {
  DeleteWebhookMutationOutput,
  deleteWebhookQuery,
} from './delete-webhook.query';

@Injectable()
export class DeleteWebhook {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ id }: DeleteWebhookInput): Promise<void> {
    const response =
      await this.graphqlClient.request<DeleteWebhookMutationOutput>(
        deleteWebhookQuery,
        {
          input: {
            id,
          },
        },
      );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }
  }
}
