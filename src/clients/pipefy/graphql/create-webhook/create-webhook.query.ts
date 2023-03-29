import { gql } from 'graphql-request';

export const createWebhookQuery = gql`
  mutation createWebhook($input: CreateWebhookInput!) {
    createWebhook(input: $input) {
      webhook {
        id
        actions
        url
      }
    }
  }
`;

export type CreateWebhookMutationOutput = {
  createWebhook: {
    webhook: {
      id: string;
      actions: string[];
      url: string;
    };
  };
};
