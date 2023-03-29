import { gql } from 'graphql-request';

export const allWebhooksQuery = gql`
  query allwebhooks($pipeId: ID!) {
    pipe(id: $pipeId) {
      webhooks {
        id
        actions
        url
        email
        headers
      }
    }
  }
`;

export type AllWebhooksQueryOutput = {
  pipe: {
    webhooks: {
      id: string;
      actions: string[];
      url: string;
      email: string;
      headers: string;
    }[];
  };
};
