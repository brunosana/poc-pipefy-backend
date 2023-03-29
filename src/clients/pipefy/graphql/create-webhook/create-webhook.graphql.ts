import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { CreateWebhookInput, CreateWebhookOutput } from './create-webhook.dto';
import {
  CreateWebhookMutationOutput,
  createWebhookQuery,
} from './create-webhook.query';

@Injectable()
export class CreateWebhook {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({
    actions,
    name,
    pipe_id,
    url,
  }: CreateWebhookInput): Promise<CreateWebhookOutput> {
    const response =
      await this.graphqlClient.request<CreateWebhookMutationOutput>(
        createWebhookQuery,
        {
          input: {
            actions,
            name,
            pipe_id,
            url,
          },
        },
      );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }
    return {
      webhook: response.createWebhook.webhook,
    };
  }
}
