import { gql } from 'graphql-request';

export const updateFieldsMutation = gql`
  mutation updateCardFields($input: UpdateFieldsValuesInput!) {
    updateFieldsValues(input: $input) {
      success
    }
  }
`;

export type UpdateFieldsMutationOutput = {
  updateFieldsValues: {
    success: boolean;
  };
};
