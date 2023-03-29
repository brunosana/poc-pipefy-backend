import { gql } from 'graphql-request';

export const deleteWebhookQuery = gql`
  mutation deleteWebhook($input: DeleteWebhookInput!) {
    deleteWebhook(input: $input) {
      success
    }
  }
`;

export type DeleteWebhookMutationOutput = {
  deleteWebhook: {
    success: boolean;
  };
};
