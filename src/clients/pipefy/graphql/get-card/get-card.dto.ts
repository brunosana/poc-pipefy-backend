import { CardField } from './get-card.query';

export type GetCardInput = {
  id: number;
};

export type GetCardOutput = {
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
