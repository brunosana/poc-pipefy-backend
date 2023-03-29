import { isPipefyRequestError } from '@clients/pipefy/utils/is-error.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AllWebhooksInput, AllWebhooksOutput } from './all-webhooks.dto';
import { allWebhooksQuery, AllWebhooksQueryOutput } from './all-webhooks.query';

@Injectable()
export class AllWebhooks {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async execute({ pipeId }: AllWebhooksInput): Promise<AllWebhooksOutput> {
    const response = await this.graphqlClient.request<AllWebhooksQueryOutput>(
      allWebhooksQuery,
      {
        pipeId,
      },
    );

    const pipefyError = isPipefyRequestError(response);
    if (pipefyError.isError) {
      throw new BadRequestException(pipefyError.messages[0]);
    }

    return {
      webhooks: response.pipe.webhooks.map((webhook) => ({
        id: webhook.id,
        actions: webhook.actions,
        url: webhook.url,
        email: webhook.email,
        headers: webhook.headers,
      })),
    };
  }
}
