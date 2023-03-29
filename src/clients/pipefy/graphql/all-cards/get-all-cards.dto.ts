import { CardField } from '../get-card/get-card.query';

export type GetAllCardsInput = {
  pipeId: number;
};

export type GetAllCardsOutput = {
  cards: {
    currentPhase: string;
    fields: CardField[];
    id: string;
    title: string;
  }[];
};
