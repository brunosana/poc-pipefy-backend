export type PipefyActionValues =
  | 'card.create'
  | 'card.field_update'
  | 'card.move'
  | 'card.done'
  | 'card.delete'
  | 'card.late'
  | 'card.overdue'
  | 'card.expired';

export type CreateWebhookInputDto = {
  actions: PipefyActionValues[];
  name: string;
  url: string;
};
