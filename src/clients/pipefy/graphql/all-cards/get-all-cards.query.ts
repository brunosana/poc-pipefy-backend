import { gql } from 'graphql-request';
import { CardField } from '../get-card/get-card.query';

export const getAllCardsQuery = gql`
  query allCards($input: ID!) {
    allCards(pipeId: $input) {
      edges {
        node {
          id
          title
          fields {
            field {
              id
            }
            name
            value
          }
          current_phase {
            name
          }
        }
      }
    }
  }
`;

export type GetAllCardsQueryOutput = {
  allCards: {
    edges: {
      node: {
        id: string;
        title: string;
        fields: CardField[];
        current_phase: {
          name: string;
        };
      };
    }[];
  };
};
