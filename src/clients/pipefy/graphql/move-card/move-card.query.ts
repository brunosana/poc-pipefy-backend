import { gql } from 'graphql-request';
import { CardField } from '../get-card/get-card.query';

export const moveCardMutation = gql`
  mutation moveCard($input: MoveCardToPhaseInput!) {
    moveCardToPhase(input: $input) {
      card {
        id
      }
    }
  }
`;

export type MoveCardMutationOutput = {
  card: {
    id: string;
  };
};
