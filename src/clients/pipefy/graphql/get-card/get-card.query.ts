import { gql } from 'graphql-request';

export const getCardQuery = gql`
  query getCard($id: ID!) {
    card(id: $id) {
      pipe {
        id
        name
      }
      fields {
        field {
          id
        }
        name
        value
        filled_at
      }
      current_phase {
        id
        name
      }
      assignees {
        name
        email
      }
    }
  }
`;

export type CardField = {
  name: string;
  value: string;
  filled_at: string;
  field: {
    id: string;
  };
};

export type GetCardQueryOutput = {
  card: {
    pipe: {
      id: string;
      name: string;
    };
    fields: CardField[];
    current_phase: {
      id: string;
      name: string;
    };
    assignees: {
      name: string;
      email: string;
    }[];
  };
};
